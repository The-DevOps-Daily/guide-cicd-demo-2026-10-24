// Builds the site into dist/: index.html plus version.json for smoke tests.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { renderPage } from '../src/render.js';

const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const commands = JSON.parse(await readFile('src/commands.json', 'utf8'));

const title = process.env.SITE_TITLE || 'Command Cheatsheet';
const commit = process.env.GITHUB_SHA || 'local';

await mkdir('dist', { recursive: true });
await writeFile('dist/index.html', renderPage(commands, { title, version: pkg.version, commit }));
await writeFile(
  'dist/version.json',
  JSON.stringify({ version: pkg.version, commit }, null, 2) + '\n'
);

console.log(
  `Built dist/ with ${commands.length} commands (version ${pkg.version}, commit ${commit.slice(0, 7)})`
);
