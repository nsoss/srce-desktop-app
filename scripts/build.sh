#!/usr/bin/env bash

set -e

npx react-scripts build
npx tsc --build --listEmittedFiles --verbose ./electron/
npx electron-builder --dir -c.extraMetadata.main=build/index.js --publish never
