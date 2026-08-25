#!/usr/bin/env python3
"""Convert template images to WebP (high quality, capped at MAX_DIM) and rewrite
references in the generated pages. Run after convert.py.

usage: optimize.py <project_root>
"""
import sys, os, glob, re
from PIL import Image

root = sys.argv[1]
MAX_DIM = 1920
QUALITY = 85

renames = {}  # old basename -> new basename
before = after = 0
for path in sorted(glob.glob(os.path.join(root, 'public/templates/**/*.*'), recursive=True)):
    ext = path.rsplit('.', 1)[-1].lower()
    if ext not in ('png', 'jpg', 'jpeg'):
        continue
    im = Image.open(path)
    w, h = im.size
    if max(w, h) > MAX_DIM:
        s = MAX_DIM / max(w, h)
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    im = im.convert('RGBA' if has_alpha else 'RGB')
    out = path.rsplit('.', 1)[0] + '.webp'
    # small transparent logos stay lossless so edges/text remain crisp
    lossless = has_alpha and w * h < 400_000
    im.save(out, 'WEBP', quality=QUALITY, method=6, lossless=lossless)
    src_size, out_size = os.path.getsize(path), os.path.getsize(out)
    before += src_size
    if out_size < src_size * 0.9:
        os.remove(path)
        renames[os.path.basename(path)] = os.path.basename(out)
        after += out_size
    else:
        os.remove(out)
        after += src_size

# rewrite references in generated pages
for tsx in glob.glob(os.path.join(root, 'src/templates/*/Page.tsx')):
    s = open(tsx, encoding='utf-8').read()
    n = s
    for old, new in renames.items():
        n = n.replace('/' + old, '/' + new)
    if n != s:
        open(tsx, 'w', encoding='utf-8').write(n)

print(f'images: {before/1e6:.1f} MB -> {after/1e6:.1f} MB ({len(renames)} converted to WebP)')
