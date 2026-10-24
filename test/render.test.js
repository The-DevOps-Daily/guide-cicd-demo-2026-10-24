import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, groupByTopic, renderPage } from '../src/render.js';

const commands = [
  { topic: 'git', cmd: 'git status', description: 'Show changed files' },
  { topic: 'docker', cmd: 'docker ps', description: 'List running containers' },
  { topic: 'git', cmd: 'git log --oneline', description: 'Short history' },
];

test('escapeHtml escapes markup characters', () => {
  assert.equal(
    escapeHtml('<a href="x">&\'</a>'),
    '&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;'
  );
});

test('groupByTopic sorts topics and commands', () => {
  const groups = groupByTopic(commands);
  assert.deepEqual(
    groups.map(([topic]) => topic),
    ['docker', 'git']
  );
  assert.deepEqual(
    groups[1][1].map((c) => c.cmd),
    ['git log --oneline', 'git status']
  );
});

test('renderPage shows the title, version and short commit', () => {
  const html = renderPage(commands, {
    title: 'Cheatsheet',
    version: '1.0.0',
    commit: '0123456789abcdef',
  });
  assert.match(html, /<title>Cheatsheet<\/title>/);
  assert.match(html, /3 commands, version 1\.0\.0, commit 0123456/);
});

test('renderPage escapes command text', () => {
  const html = renderPage([{ topic: 'x', cmd: '<script>alert(1)</script>', description: 'bad' }], {
    title: 't',
    version: '1',
    commit: 'abc',
  });
  assert.ok(!html.includes('<script>'));
});
