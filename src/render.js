// Renders the command list into a single HTML page.

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Returns [[topic, commands], ...] with topics and commands in alphabetical order.
export function groupByTopic(commands) {
  const groups = new Map();
  for (const command of commands) {
    if (!groups.has(command.topic)) {
      groups.set(command.topic, []);
    }
    groups.get(command.topic).push(command);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([topic, list]) => [topic, list.sort((a, b) => a.cmd.localeCompare(b.cmd))]);
}

export function renderPage(commands, { title, version, commit }) {
  const sections = groupByTopic(commands)
    .map(
      ([topic, list]) => `<section>
<h2>${escapeHtml(topic)}</h2>
<dl>
${list.map((c) => `<dt><code>${escapeHtml(c.cmd)}</code></dt><dd>${escapeHtml(c.description)}</dd>`).join('\n')}
</dl>
</section>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
${sections}
<footer>${commands.length} commands, version ${escapeHtml(version)}, commit ${escapeHtml(commit.slice(0, 7))}</footer>
</body>
</html>
`;
}
