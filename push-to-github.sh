#!/usr/bin/env bash
# Creates the GitHub repository and pushes this project.
# Run after `gh auth login`.
set -euo pipefail
cd "$(dirname "$0")"

REPO_NAME="${1:-mathematical-modelling-website}"

gh repo create "$REPO_NAME" \
  --public \
  --source=. \
  --remote=origin \
  --description "Marketing website for Mathematical Modelling — Next.js 16, Tailwind CSS v4" \
  --push

echo
echo "Pushed. Repository:"
gh repo view --json url --jq .url
