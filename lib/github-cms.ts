import matter from 'gray-matter';

const REPO = 'Xyntera/octrawallet-landing';
const BRANCH = 'main';

function apiHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

export async function listDir(dir: string) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${dir}?ref=${BRANCH}`,
    { headers: apiHeaders(), cache: 'no-store' }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const data = await res.json() as Array<{ name: string; path: string; sha: string; type: string }>;
  return data.filter((f) => f.type === 'file' && f.name.endsWith('.md'));
}

export async function readFile(path: string) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    { headers: apiHeaders(), cache: 'no-store' }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const data = await res.json() as { sha: string; content: string };
  const raw = Buffer.from(data.content, 'base64').toString('utf-8');
  const { data: fm, content: body } = matter(raw);
  const frontmatter = Object.fromEntries(
    Object.entries(fm).map(([k, v]) => [k, v instanceof Date ? v.toISOString().split('T')[0] : v])
  );
  return { sha: data.sha, frontmatter, body: body.trim() };
}

export async function writeFile(
  path: string,
  frontmatter: Record<string, unknown>,
  body: string,
  sha: string | undefined
) {
  const raw = matter.stringify('\n' + body, frontmatter);
  const payload: Record<string, string> = {
    message: sha ? `Update ${path} via CMS` : `Create ${path} via CMS`,
    content: Buffer.from(raw).toString('base64'),
    branch: BRANCH,
  };
  if (sha) payload.sha = sha;
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}`,
    { method: 'PUT', headers: apiHeaders(), body: JSON.stringify(payload) }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const data = await res.json() as { content: { sha: string } };
  return data.content.sha;
}
