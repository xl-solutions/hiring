#!/bin/bash
cd front && npm install && \ 
cd ../back && npm install && \
npm install pm2@latest -g