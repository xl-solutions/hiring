#!/bin/bash
cd front && pm2 start "npm start" && \
cd ../back && pm2 start "npm run start"