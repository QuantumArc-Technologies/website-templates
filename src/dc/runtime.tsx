/* eslint-disable */
/**
 * Minimal re-implementation of the Claude Design `dc-runtime` semantics that the
 * converted templates depend on. Generated template files (src/templates/*\/Page.tsx)
 * import from here. Behaviour mirrors the original runtime so the pages render
 * identically, just compiled ahead of time by Vite instead of interpreted at runtime.
 */
import React from 'react'

export type Vals = Record<string, any>

/* ────────── expression resolver ({{ … }}) ────────── */
const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*/
const NUMBER_RE = /^-?\d+(\.\d+)?$/

function parensWrapWhole(expr: string) {
  let depth = 0
  for (let i = 0; i < expr.length - 1; i++) {
    if (expr[i] === '(') depth++
    else if (expr[i] === ')') {
      depth--
      if (depth === 0) return false
    }
  }
  return true
}

function findTopLevelEquality(expr: string) {
  let depth = 0
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i]
    if (c === '[' || c === '(') depth++
    else if (c === ']' || c === ')') depth--
    else if (depth === 0 && (c === '=' || c === '!') && expr[i + 1] === '=') {
      if (i > 0 && (expr[i - 1] === '=' || expr[i - 1] === '!')) continue
      if (!expr.slice(0, i).trim()) continue
      const op = expr[i + 2] === '=' ? c + '==' : c + '='
      return { index: i, op }
    }
  }
  return null
}

function resolvePath(vals: Vals, expr: string): any {
  const head = expr.match(IDENT_RE)
  if (!head) return undefined
  let cur = vals == null ? undefined : vals[head[0]]
  let i = head[0].length
  while (i < expr.length) {
    if (expr[i] === '.') {
      const m = expr.slice(i + 1).match(IDENT_RE) || expr.slice(i + 1).match(/^\d+/)
      if (!m) return undefined
      cur = cur == null ? undefined : cur[m[0]]
      i += 1 + m[0].length
    } else if (expr[i] === '[') {
      let depth = 1
      let j = i + 1
      while (j < expr.length && depth > 0) {
        if (expr[j] === '[') depth++
        else if (expr[j] === ']') {
          depth--
          if (depth === 0) break
        }
        j++
      }
      if (depth !== 0) return undefined
      const key = r(vals, expr.slice(i + 1, j))
      cur = cur == null ? undefined : cur[key]
      i = j + 1
    } else {
      return undefined
    }
  }
  return cur
}

/** resolve(vals, expr) */
export function r(vals: Vals, src: string): any {
  const expr = String(src).trim()
  if (!expr) return undefined
  if (expr[0] === '(' && expr[expr.length - 1] === ')' && parensWrapWhole(expr)) {
    return r(vals, expr.slice(1, -1))
  }
  const eq = findTopLevelEquality(expr)
  if (eq) {
    const lv = r(vals, expr.slice(0, eq.index))
    const rv = r(vals, expr.slice(eq.index + eq.op.length))
    switch (eq.op) {
      case '===':
        return lv === rv
      case '!==':
        return lv !== rv
      case '==':
        return lv == rv
      default:
        return lv != rv
    }
  }
  if (expr[0] === '!') return !r(vals, expr.slice(1))
  if (expr === 'true') return true
  if (expr === 'false') return false
  if (expr === 'null') return null
  if (expr === 'undefined') return undefined
  if (NUMBER_RE.test(expr)) return Number(expr)
  if (expr.length >= 2 && (expr[0] === '"' || expr[0] === "'") && expr[expr.length - 1] === expr[0]) {
    return expr.slice(1, -1)
  }
  return resolvePath(vals, expr)
}

/** Attribute value: whole-binding returns the raw value, mixed text interpolates to a string. */
export function attr(vals: Vals, raw: string): any {
  const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/)
  if (whole) return r(vals, whole[1])
  if (raw.includes('{{')) {
    const parts = raw.split(/\{\{([\s\S]+?)\}\}/g)
    return parts.map((s, i) => (i & 1 ? (r(vals, s) ?? '') : s)).join('')
  }
  return raw
}

/** Text-node interpolation — same output shape as the runtime (<span class="sc-interp">). */
export function interp(vals: Vals, expr: string): React.ReactNode {
  const v = r(vals, expr)
  if (v === undefined) return null
  if (React.isValidElement(v) || Array.isArray(v)) return <React.Fragment>{v}</React.Fragment>
  if (v === null || typeof v === 'boolean') return null
  return <span className="sc-interp">{String(v)}</span>
}

/* ────────── style handling ────────── */
function kebabToCamel(s: string) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

const cssCache = new Map<string, React.CSSProperties>()
export function css(v: any): React.CSSProperties | undefined {
  if (v == null) return undefined
  if (typeof v !== 'string') return v
  const hit = cssCache.get(v)
  if (hit) return hit
  const o: Record<string, string> = {}
  for (const decl of v.split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const prop = decl.slice(0, i).trim()
    o[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim()
  }
  cssCache.set(v, o)
  return o
}

function importantify(cssText: string) {
  return cssText
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => (/!important$/i.test(d) ? d : d + ' !important'))
    .join(';')
}

let pseudoEl: HTMLStyleElement | null = null
const pseudoCache = new Map<string, string>()
let pseudoN = 0
/** `style-hover="…"` etc → generated class with the pseudo rule (declarations forced !important). */
export function pc(pseudo: string, cssText: string): string {
  const k = pseudo + '|' + cssText
  const hit = pseudoCache.get(k)
  if (hit) return hit
  if (!pseudoEl) {
    pseudoEl = document.createElement('style')
    pseudoEl.setAttribute('data-dc-pseudo', '')
    document.head.appendChild(pseudoEl)
  }
  const cls = 'scp' + (pseudoN++).toString(36)
  const isPseudoElement = pseudo === 'before' || pseudo === 'after'
  const sel = isPseudoElement ? '.' + cls + '::' + pseudo : '.' + cls + ':' + pseudo
  const sheet = pseudoEl.sheet!
  sheet.insertRule(sel + '{' + (isPseudoElement ? cssText : importantify(cssText)) + '}', sheet.cssRules.length)
  pseudoCache.set(k, cls)
  return cls
}

/** join className + pseudo classes */
export function cx(...parts: (string | undefined | null | false)[]) {
  return parts.filter(Boolean).join(' ') || undefined
}

/* ────────── sc-for ────────── */
export function each(vals: Vals, listRaw: string, asName: string, body: (v: Vals) => React.ReactNode) {
  let list = attr(vals, listRaw)
  if (!Array.isArray(list)) list = []
  return list.map((item: any, i: number) => (
    <React.Fragment key={i}>{body({ ...vals, [asName]: item, $index: i })}</React.Fragment>
  ))
}

/* ────────── helmet ────────── */
const BASE_CSS =
  'html,body{height:100%;margin:0}#dc-root,#dc-root>.sc-host{height:100%}#dc-root{overflow-x:clip}' +
  '.sc-interp.sc-missing{display:inline-block;width:2em;height:1em;overflow:hidden;vertical-align:text-bottom}'

/** Mounts the template's <helmet> children (styles/links/meta) into <head> while the page is shown. */
export function Helmet({ html }: { html: string }) {
  React.useLayoutEffect(() => {
    const added: Element[] = []
    const base = document.createElement('style')
    base.setAttribute('data-dc-base', '')
    base.textContent = BASE_CSS
    document.head.appendChild(base)
    added.push(base)
    const doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html')
    for (const child of Array.from(doc.body.firstElementChild?.children ?? [])) {
      const tag = child.tagName
      if (tag === 'SCRIPT') continue
      const el = document.createElement(tag.toLowerCase())
      for (const { name, value } of Array.from(child.attributes)) el.setAttribute(name, value)
      if (child.textContent) el.textContent = child.textContent
      document.head.appendChild(el)
      added.push(el)
    }
    return () => {
      for (const el of added) el.remove()
    }
  }, [html])
  return null
}

/* ────────── logic base class ────────── */
export type RenderFn = (vals: Vals, self: any) => React.ReactNode

export class DCLogic<P = any, S = any> extends React.Component<P & { __render: RenderFn; __helmet: string }, S> {
  constructor(props: any) {
    super(props)
    // Subclasses set `state = {...}` as a class field, which runs after super().
  }
  renderVals(): Vals {
    return {}
  }
  render() {
    const { __render, __helmet, ...userProps } = this.props as any
    const vals: Vals = { ...userProps, ...(this.renderVals() || {}) }
    return (
      <>
        <Helmet html={__helmet} />
        <div id="dc-root">
          <div className="sc-host">{__render(vals, this)}</div>
        </div>
      </>
    )
  }
}
