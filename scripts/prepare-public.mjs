import { unlink, rmdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
// Only two generated commercial preview copies; never delete source assets.
const project = process.cwd();
const folder = resolve(project, 'public/commercial');
if (dirname(folder) !== resolve(project, 'public')) throw new Error('Unsafe preview path');
for (const filename of ['mostaza.png', 'axion.webp']) {
  try {
    await unlink(resolve(folder, filename));
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}
try {
  await rmdir(folder);
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
}
