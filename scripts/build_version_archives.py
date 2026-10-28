#!/usr/bin/env python3
"""Package checked-out historical public/ trees under /versions/<tag>/.

Run from repository root after checking out each tag/branch into
.build/versions/<tag>/public (see workflow). This does not deploy.
"""
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "versions"
VERSIONS = ("v0.0", "v0.1", "v0.2", "v1.0")
TEXT_SUFFIXES = {".html", ".js", ".css", ".json", ".mjs"}

for version in VERSIONS:
    source = ROOT / ".build" / "versions" / version / "public"
    if not (source / "index.html").is_file():
        raise SystemExit(f"Missing historical checkout: {source}")
    target = OUT / version
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target, ignore=shutil.ignore_patterns("env.json", "env.js"))

    prefix = f"/versions/{version}"
    for path in target.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        data = path.read_text(encoding="utf-8")
        # Rewrite only root-relative paths, not //CDN URLs or external links.
        # Historical scripts refer to root-relative files in quoted strings.
        # Prefix them so each version loads its own assets and scripts.
        data = re.sub(
            r"""(?P<quote>["'])/(?P<path>assets|src|libs|play|ranked|config\.js|env\.json)(?=/|["'?])""",
            lambda m: m.group("quote") + prefix + "/" + m.group("path"),
            data,
        )
        # Also rewrite unquoted CSS background URLs (url(/assets/...)).
        data = re.sub(
            r"url\\(\\s*/(?P<path>assets|src|libs)(?=/)",
            lambda m: "url(" + prefix + "/" + m.group("path"),
            data,
        )
        # Handle unquoted CSS url(/assets/...) references as well.
        data = re.sub(
            r"url\(\s*/(?P<path>assets|src|libs)(?=/)",
            lambda m: "url(" + prefix + "/" + m.group("path"),
            data,
        )
        path.write_text(data, encoding="utf-8")

    # Archive-specific entry point. Historical gameplay remains untouched.
    index = target / "index.html"
    html = index.read_text(encoding="utf-8")
    html = html.replace("</body>", (
        '<a href="/" style="position:fixed;z-index:99999;bottom:12px;left:12px;'
        'padding:8px 12px;background:#153e27;color:white;font:14px sans-serif;'
        'text-decoration:none;border:1px solid white;border-radius:5px">'
        'Return to Latest</a></body>'
    ))
    index.write_text(html, encoding="utf-8")
    print(f"Packaged {version}: {target}")
