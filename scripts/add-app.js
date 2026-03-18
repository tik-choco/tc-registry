#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, '..', 'apps.json');

/**
 * Issue本文から項目を抜き取る（GitHub Issue テンプレートを前提とした簡易実装）
 */
function extractField(body, label) {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;

    // "### アプリ名" などのラベル行に続く行を取得
    if (
      trimmed === label ||
      trimmed === `### ${label}` ||
      trimmed === `## ${label}` ||
      trimmed === `${label}:`
    ) {
      for (let j = i + 1; j < lines.length; j += 1) {
        const next = lines[j].trim();
        if (next) return next;
      }
    }
  }
  return null;
}

const issueBody = process.env.ISSUE_BODY || '';
let [title, url] = process.argv.slice(2);

if ((!title || !url) && issueBody) {
  title = title || extractField(issueBody, 'アプリ名');
  url = url || extractField(issueBody, 'URL');
}

if (!title || !url) {
  console.error('Usage: node scripts/add-app.js "Title" "https://example.com"');
  console.error('Or set ISSUE_BODY env var using the GitHub Issue body.');
  process.exit(1);
}

try {
  new URL(url);
} catch (err) {
  console.error('Invalid URL:', url);
  process.exit(1);
}

const raw = fs.readFileSync(dbPath, 'utf8');
const data = raw.trim() ? JSON.parse(raw) : [];

const entry = {
  id: crypto.randomUUID(),
  url: url.trim(),
  title: title.trim(),
  hostname: new URL(url).hostname,
  addedAt: Date.now(),
};

data.push(entry);
fs.writeFileSync(dbPath, JSON.stringify(data, null, 2) + '\n');

console.log(`Added: ${entry.title} (${entry.url})`);
