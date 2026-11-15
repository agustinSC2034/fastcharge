import { readFile, readdir, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const html = await readFile('dist/index.html', 'utf8');
assert(html.includes('La energía'), 'Missing hero');
for (const id of ['fastcharge', 'soluciones', 'ubicaciones', 'app', 'contacto'])
  assert(html.includes(`id="${id}"`), `Missing ${id}`);
assert(!html.includes('Precio FOB'), 'Private price data leaked');
if (process.env.PUBLIC_COMMERCIAL_PREVIEW !== 'true') {
  assert(!/Mostaza|AXION energy/.test(html), 'Commercial partners in public HTML');
  assert(
    !(await readdir('dist')).includes('commercial'),
    'Private commercial assets in public build. Remove public/commercial before building.',
  );
}
console.log('Static output and publication safeguards passed.');

const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
for (const match of html.matchAll(/(?:src|href|poster)="([^"#]+)"/g)) {
  const url = match[1];
  if (/^(https?:|data:|mailto:)/.test(url)) continue;
  const path = url.split('?')[0];
  if (path.startsWith(base + '/')) await access('dist/' + path.slice(base.length + 1));
}
console.log('All local HTML assets resolve under configured base path.');
