#!/usr/bin/env bash
set -euo pipefail

# Fill this in with your droplet user@host:/path
DEPLOY_TARGET="larsewi.com:/var/www/larsewi.com/"

npm ci
npm run build

echo "Dry run (no files transferred):"
rsync -avzn --delete dist/ "$DEPLOY_TARGET"

read -r -p "Proceed with real deploy? [y/N] " reply
case "$reply" in
  [yY]|[yY][eE][sS])
    rsync -avz --delete dist/ "$DEPLOY_TARGET"
    echo "Deployed."
    ;;
  *)
    echo "Aborted."
    exit 1
    ;;
esac
