/* eslint-disable */
import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import axios from 'axios';

var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  console.log('\nStarting api for e2e...');

  const apiMain = join(process.cwd(), 'dist/apps/api/main.js');
  const child = spawn('node', [apiMain], {
    stdio: 'ignore',
    detached: false,
    env: { ...process.env, PORT: '3000' },
  });

  (globalThis as any).__API_PROCESS__ = child;

  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3000';
  const url = `http://${host}:${port}/api`;
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      await axios.get(url);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down api...\n';
};
