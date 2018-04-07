#!/bin/bash
set -x

openssl aes-256-cbc -K $encrypted_0eb8cab50dbb_key -iv $encrypted_0eb8cab50dbb_iv -in deploy-key.enc -out deploy-key -d

pwd
ls

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 deploy-key # Allow read access to the private key
ssh-add deploy-key # Add the private key to SSH

# Skip this command if you don't need to execute any additional commands after deploying.
ssh -o "StrictHostKeyChecking no" $DEPLOY_USER@$BACKEND_SERVER <<EOF
  cd SA-backend/
  git checkout do-deploy
  git pull
  npm install
  npm restart;
EOF