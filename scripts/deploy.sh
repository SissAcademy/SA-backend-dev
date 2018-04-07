#!/bin/bash

ssh deploy@188.166.52.223 'cd SA-backend/; git checkout do-deploy; git pull; npm install; npm restart;'