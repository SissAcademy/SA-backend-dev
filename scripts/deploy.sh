#!/bin/bash
openssl aes-256-cbc -K $encrypted_0eb8cab50dbb_key -iv $encrypted_0eb8cab50dbb_iv -in deploy_rsa.enc -out /tmp/deploy_rsa -d
eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 /tmp/deploy_rsa # Allow read access to the private key
ssh-add /tmp/deploy_rsa # Add the private key to SSH
q
ssh -o "StrictHostKeyChecking no" $DEPLOY_USER@$BACKEND_SERVER <<EOF
  cd SA-backend-dev/
  git checkout do-deploy
  git pull
  npm install
  npm restart;
EOF