#!/usr/bin/env bash

set -ex

npm run hint
npm run test

node package.json
