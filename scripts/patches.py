#!/usr/bin/env python3
"""Small, deliberate deviations from the original pages, applied to the generated
Page.tsx files after conversion. Each patch must match exactly `count` times.
usage: patches.py <project_root>
"""
import sys, os
root = sys.argv[1]

PATCHES = {
  # ── compact mobile menus ──────────────────────────────────────────────────
  'liftflow-global-website': [
    ('padding:110px clamp(20px,6vw,60px) 40px;overflow-y:auto', 'padding:92px clamp(20px,6vw,60px) 32px;overflow-y:auto', 1),
    ('display:block;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.1);font-size:clamp(28px,8vw,44px);font-weight:800;letter-spacing:-.03em',
     'display:block;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.1);font-size:20px;font-weight:700;letter-spacing:-.02em', 1),
    ('margin-top:32px;background:#FF9406;color:#0B1220;font-weight:800;padding:20px;font-size:15px',
     'margin-top:22px;background:#FF9406;color:#0B1220;font-weight:800;padding:15px;font-size:13px', 1),
    ('margin-top:28px;font-family:\'IBM Plex Mono\',monospace;font-size:12.5px;line-height:2', 'margin-top:20px;font-family:\'IBM Plex Mono\',monospace;font-size:12px;line-height:1.9', 1),
  ],
  'liftflow-global': [
    ("font:600 19px/1 'Archivo',sans-serif;letter-spacing:.01em;text-transform:uppercase;color:#15171B;padding:12px 0",
     "font:600 14px/1 'Archivo',sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#15171B;padding:10px 0", None),
  ],
  'liftflow-home': [
    ("font-family:'Outfit',sans-serif;font-size:34px;font-weight:900;letter-spacing:-0.01em;color:#fff;padding:10px 0",
     "font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;letter-spacing:0;color:#fff;padding:9px 0", None),
    ("font-family:'Outfit',sans-serif;font-size:34px;font-weight:900;letter-spacing:-0.01em;color:rgba(255,255,255,0.8);padding:10px 0",
     "font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;letter-spacing:0;color:rgba(255,255,255,0.8);padding:9px 0", None),
    ("font-family:'Outfit',sans-serif;font-size:34px;font-weight:900;letter-spacing:-0.01em;color:#ff1053;padding:10px 0",
     "font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;letter-spacing:0;color:#ff1053;padding:9px 0", None),
  ],
  'liftflow-website1': [
    ('font-family: Syncopate, sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase; padding: 14px 0',
     'font-family: Syncopate, sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; padding: 11px 0', None),
  ],
}

for slug, patches in PATCHES.items():
    path = os.path.join(root, 'src/templates', slug, 'Page.tsx')
    s = open(path, encoding='utf-8').read()
    for old, new, count in patches:
        n = s.count(old)
        if n == 0 or (count is not None and n != count):
            sys.exit(f'{slug}: patch matched {n}x (expected {count or ">=1"}): {old[:70]}…')
        s = s.replace(old, new)
    open(path, 'w', encoding='utf-8').write(s)
    print(f'{slug}: {len(patches)} patches applied')
