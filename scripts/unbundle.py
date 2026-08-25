#!/usr/bin/env python3
"""Unpack a Claude-artifact bundled HTML file into a plain HTML + real asset files.
usage: unbundle.py <bundle.html> <out_dir> [public_url_prefix]
"""
import sys, re, json, base64, gzip, os, hashlib

EXT = {'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/svg+xml':'svg','image/gif':'gif',
       'video/mp4':'mp4','application/pdf':'pdf','text/javascript':'js','font/woff2':'woff2','font/woff':'woff',
       'text/css':'css','application/json':'json'}

src, out = sys.argv[1], sys.argv[2]
prefix = sys.argv[3] if len(sys.argv) > 3 else 'assets'
s = open(src, encoding='utf-8').read()
grab = lambda t: re.search(r'<script type="__bundler/%s">(.*?)</script>' % t, s, re.S)
manifest = json.loads(grab('manifest').group(1))
template = json.loads(grab('template').group(1))
ext_res = grab('ext_resources')
ext_res = json.loads(ext_res.group(1)) if ext_res else []

os.makedirs(os.path.join(out, 'assets'), exist_ok=True)
index = {}
for uuid, entry in manifest.items():
    raw = base64.b64decode(entry['data'])
    if entry.get('compressed'):
        raw = gzip.decompress(raw)
    ext = EXT.get(entry['mime'], 'bin')
    name = f"{hashlib.sha1(raw).hexdigest()[:10]}.{ext}"
    open(os.path.join(out, 'assets', name), 'wb').write(raw)
    index[uuid] = {'file': name, 'mime': entry['mime'], 'size': len(raw)}
    template = template.replace(uuid, f"{prefix}/{name}")

template = re.sub(r'\s+integrity="[^"]*"', '', template)
template = re.sub(r'\s+crossorigin="[^"]*"', '', template)
open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(template)
json.dump({'assets': index, 'ext_resources': ext_res}, open(os.path.join(out, 'manifest.json'), 'w'), indent=1)
print(f"{os.path.basename(src)}: {len(index)} assets, template {len(template)//1024} KB")
