#!/usr/bin/env bash
# Run from the Hoppy Coin repository root after Forge checks out master.
# Builds versioned static assets locally; does not alter tracked source files.
set -euo pipefail
cd "$(dirname "$0")/.."

versions=(v0.0 v0.1 v0.2 v1.0)

# Forge checkouts may not contain tags locally.
git fetch --no-recurse-submodules --tags origin >/dev/null

for version in "${versions[@]}"; do
    target=".build/versions/$version"
    mkdir -p "$target"
    # git archive exports tracked historical files without checking out master.
    git archive "refs/tags/$version" public/ | tar -xf - -C "$target"
done

python3 scripts/build_version_archives.py
for version in "${versions[@]}"; do
    test -s "public/versions/$version/index.html"
done
echo "Hoppy Coin archives packaged in public/versions/"
