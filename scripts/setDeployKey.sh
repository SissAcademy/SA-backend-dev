#!/bin/bash
set -x

openssl aes-256-cbc -K $encrypted_0eb8cab50dbb_key -iv $encrypted_0eb8cab50dbb_iv -in deploy-key.enc -out deploy-key -d
cp deploy-key the-key

pwd
ls