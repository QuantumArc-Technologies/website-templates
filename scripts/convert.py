#!/usr/bin/env python3
"""Compile an unbundled Claude Design page (index.html with <x-dc> markup + logic script)
into a React TSX component that renders identically without the dc-runtime interpreter.

usage: convert.py <unbundled_dir> <slug> <out_tsx>
"""
import sys, re, json, os
from html.parser import HTMLParser

src_dir, slug, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(os.path.join(src_dir, 'index.html'), encoding='utf-8').read()

# ── asset path rewriting ──────────────────────────────────────────────────────
ASSET_PREFIX = f'/templates/{slug}/assets'
html = html.replace('"assets/', f'"{ASSET_PREFIX}/').replace("'assets/", f"'{ASSET_PREFIX}/").replace('(assets/', f'({ASSET_PREFIX}/')
html = re.sub(r'https://www\.liftflowglobal\.com/public/assets/themes/frontend/images/([A-Za-z0-9_.-]+)', r'/templates/shared/\1', html)

# ── pull the pieces apart ─────────────────────────────────────────────────────
logic_m = re.search(r'<script type="text/x-dc"([^>]*)>(.*?)</script>', html, re.S)
logic_attrs, logic_src = logic_m.group(1), logic_m.group(2)
props_m = re.search(r'data-props="([^"]*)"', logic_attrs)
import html as htmlmod
props_meta = json.loads(htmlmod.unescape(props_m.group(1))) if props_m else {}
defaults = {k: v['default'] for k, v in props_meta.items() if isinstance(v, dict) and 'default' in v and not k.startswith('$')}

# bundler resource map (id -> asset url), consumed by the logic via window.__resources
manifest = json.load(open(os.path.join(src_dir, 'manifest.json')))
resources = {}
for ent in manifest.get('ext_resources', []):
    a = manifest['assets'].get(ent['uuid'])
    if a:
        resources[ent['id']] = f"{ASSET_PREFIX}/{a['file']}"
logic_src = logic_src.replace('window.__resources', '__RES')

xdc_m = re.search(r'<x-dc>(.*?)</x-dc>', html, re.S)
xdc = xdc_m.group(1)
helm_m = re.search(r'<helmet>(.*?)</helmet>', xdc, re.S)
helmet_html = helm_m.group(1) if helm_m else ''
markup = xdc[:helm_m.start()] + xdc[helm_m.end():] if helm_m else xdc
markup = re.sub(r'<script type="text/x-dc".*?</script>', '', markup, flags=re.S)

# ── HTML → tree ───────────────────────────────────────────────────────────────
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
RAW_UNWRAP = {'sc-raw-select': 'select', 'sc-raw-table': 'table', 'sc-raw-tbody': 'tbody', 'sc-raw-thead': 'thead',
              'sc-raw-tfoot': 'tfoot', 'sc-raw-tr': 'tr', 'sc-raw-td': 'td', 'sc-raw-th': 'th', 'sc-raw-caption': 'caption'}
SVG_TAGS = {t.lower(): t for t in '''altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend
feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood
feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting
feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath'''.split()}
SVG_ATTRS = {a.lower(): a for a in '''attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType
contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits
kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth
maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ
preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant
specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength
viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan'''.split()}
HTML_ATTRS = {'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex', 'readonly': 'readOnly', 'maxlength': 'maxLength',
              'minlength': 'minLength', 'autocomplete': 'autoComplete', 'colspan': 'colSpan', 'rowspan': 'rowSpan', 'srcset': 'srcSet',
              'crossorigin': 'crossOrigin', 'frameborder': 'frameBorder', 'allowfullscreen': 'allowFullScreen',
              'referrerpolicy': 'referrerPolicy', 'autoplay': 'autoPlay', 'playsinline': 'playsInline', 'novalidate': 'noValidate',
              'enctype': 'encType', 'spellcheck': 'spellCheck', 'contenteditable': 'contentEditable', 'datetime': 'dateTime',
              'accesskey': 'accessKey', 'srcdoc': 'srcDoc', 'autofocus': 'autoFocus', 'formaction': 'formAction',
              'xlink:href': 'xlinkHref', 'xml:lang': 'xmlLang', 'xml:space': 'xmlSpace', 'xmlns:xlink': 'xmlnsXlink'}
EVENT_MAP = {'onclick': 'onClick', 'onchange': 'onChange', 'oninput': 'onInput', 'onsubmit': 'onSubmit', 'onkeydown': 'onKeyDown',
             'onkeyup': 'onKeyUp', 'onkeypress': 'onKeyPress', 'onmousedown': 'onMouseDown', 'onmouseup': 'onMouseUp',
             'onmouseenter': 'onMouseEnter', 'onmouseleave': 'onMouseLeave', 'onfocus': 'onFocus', 'onblur': 'onBlur'}


def kebab_to_camel(s):
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), s)


class Node:
    def __init__(self, tag, attrs):
        self.tag, self.attrs, self.children = tag, attrs, []


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('#root', [])
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].children.append(n)
        if tag not in VOID:
            self.stack.append(n)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].children.append(Node(tag, attrs))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        # pop to matching tag
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return
        print(f'WARN: stray </{tag}>', file=sys.stderr)

    def handle_data(self, data):
        self.stack[-1].children.append(data)


p = P()
p.feed(markup)
p.close()
if len(p.stack) != 1:
    print('WARN: unclosed tags:', [n.tag for n in p.stack[1:]], file=sys.stderr)

# ── tree → JSX ────────────────────────────────────────────────────────────────
def js(s):
    return json.dumps(s, ensure_ascii=False)


def emit_text(txt):
    if not txt.strip() and ' ' not in txt:
        return ''
    if '{{' not in txt:
        return '{' + js(txt) + '}'
    parts = re.split(r'\{\{([\s\S]+?)\}\}', txt)
    out = []
    for i, part in enumerate(parts):
        if i & 1:
            out.append('{interp(v,' + js(part) + ')}')
        elif part:
            out.append('{' + js(part) + '}')
    return ''.join(out)


def emit_attr_value(raw):
    if raw is None:
        return '{true}'
    if '{{' in raw:
        return '{attr(v,' + js(raw) + ')}'
    return '{' + js(raw) + '}'


def emit_children(node, in_svg):
    return ''.join(emit(c, in_svg) for c in node.children)


def emit(node, in_svg=False):
    if isinstance(node, str):
        return emit_text(node)
    tag = node.tag
    attrs = dict(node.attrs)
    if tag == 'sc-if':
        return '{attr(v,' + js(attrs.get('value', '')) + ') ? <>' + emit_children(node, in_svg) + '</> : null}'
    if tag == 'sc-for':
        return ('{each(v,' + js(attrs.get('list', '')) + ',' + js(attrs.get('as', 'item')) +
                ',(v) => <>' + emit_children(node, in_svg) + '</>)}')
    tag = RAW_UNWRAP.get(tag, tag)
    if tag == 'svg':
        in_svg = True
    if in_svg:
        tag = SVG_TAGS.get(tag, tag)
    props = []
    pseudo = []
    class_val = None
    for name, value in node.attrs:
        key = name
        if key in ('sc-name', 'data-dc-tpl') or key.startswith('hint-'):
            continue
        if key.startswith('sc-camel-'):
            key = kebab_to_camel(key[len('sc-camel-'):])
        elif key.startswith('style-'):
            pseudo.append('pc(' + js(key[6:]) + ',' + js(value or '') + ')')
            continue
        elif key == 'class':
            class_val = value
            continue
        elif key in HTML_ATTRS:
            key = HTML_ATTRS[key]
        elif key.startswith('on'):
            key = EVENT_MAP.get(key, 'on' + key[2].upper() + key[3:])
        elif in_svg and key in SVG_ATTRS:
            key = SVG_ATTRS[key]
        if key == 'style':
            props.append('style={css(' + ('attr(v,' + js(value) + ')' if value and '{{' in value else js(value or '')) + ')}')
            continue
        if not re.match(r'^[A-Za-z_][A-Za-z0-9_:-]*$', key):
            print('WARN: odd attr', key, file=sys.stderr)
        props.append(key + '=' + emit_attr_value(value))
    if class_val is not None or pseudo:
        cls_parts = []
        if class_val is not None:
            cls_parts.append('attr(v,' + js(class_val) + ')' if '{{' in class_val else js(class_val))
        cls_parts += pseudo
        props.append('className={cx(' + ','.join(cls_parts) + ')}')
    open_tag = '<' + tag + (' ' + ' '.join(props) if props else '')
    if tag in VOID or not node.children:
        return open_tag + '/>'
    inner = emit_children(node, in_svg)
    if tag in ('style', 'script'):
        inner = '{' + js(''.join(c for c in node.children if isinstance(c, str))) + '}'
    return open_tag + '>' + inner + '</' + tag + '>'


jsx = emit_children(p.root, False)

out = f'''// @ts-nocheck
/* eslint-disable */
// GENERATED by scripts/convert.py from the original "{slug}" page — do not edit by hand.
import React from 'react'
import {{ DCLogic, r, attr, interp, css, pc, cx, each }} from '../../dc/runtime'

const HELMET = {js(helmet_html)}
const DEFAULTS = {json.dumps(defaults, ensure_ascii=False)}
const __RES = {json.dumps(resources, ensure_ascii=False)}

{logic_src.strip()}

function render(v, self) {{
  return (<>{jsx}</>)
}}

export default function Page() {{
  return <Component {{...DEFAULTS}} __helmet={{HELMET}} __render={{render}} />
}}
'''
os.makedirs(os.path.dirname(out_path), exist_ok=True)
open(out_path, 'w', encoding='utf-8').write(out)
print(f'{slug}: {len(out)//1024} KB tsx, defaults={defaults}')
