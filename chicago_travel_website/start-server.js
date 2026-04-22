#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const server = spawn('node', [path.join(__dirname, 'server.js')]);

server.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`process exited with code ${code}`);
});
