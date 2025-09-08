#!/bin/bash
cd /tmp/kavia/workspace/code-generation/interactive-user-profile-cards-651397-651406/frontend_react_js
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

