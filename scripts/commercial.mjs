import { cp, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
await mkdir('public/commercial', { recursive: true });
for (const f of ['mostaza.png', 'axion.webp']) await cp(`private/${f}`, `public/commercial/${f}`);
const child = spawn(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'dev', '--host', '127.0.0.1', '--port', '4322'],
  { stdio: 'inherit', env: { ...process.env, PUBLIC_COMMERCIAL_PREVIEW: 'true' } },
);
child.on('exit', (code) => process.exit(code || 0));
