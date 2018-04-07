#!/bin/bash

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