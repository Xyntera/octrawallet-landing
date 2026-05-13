import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from '@/lib/github-cms';

const SAFE_PATH = /^content\/(blog|docs|changelog)\/[a-zA-Z0-9_.-]+\.md$/;

function authorized(req: NextRequest) {
  return req.headers.get('Authorization') === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const path = req.nextUrl.searchParams.get('path') ?? '';
  if (!SAFE_PATH.test(path)) return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  try {
    return NextResponse.json(await readFile(path));
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { path, frontmatter, body, sha } = await req.json() as {
    path: string;
    frontmatter: Record<string, unknown>;
    body: string;
    sha?: string;
  };
  if (!SAFE_PATH.test(path)) return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  try {
    const newSha = await writeFile(path, frontmatter, body, sha);
    return NextResponse.json({ sha: newSha });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
