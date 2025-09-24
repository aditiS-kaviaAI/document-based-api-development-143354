#!/bin/bash
cd /home/kavia/workspace/code-generation/document-based-api-development-143354/be_apis
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

