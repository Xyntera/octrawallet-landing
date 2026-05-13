import { NextRequest, NextResponse } from 'next/server';
import { listDir } from '@/lib/github-cms';

const ALLOWED = ['blog', 'docs', 'changelog'];

function authorized(req: NextRequest) {
  return req.headers.get('Authorization') === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const dir = req.nextUrl.searchParams.get('dir') ?? '';
  if (!ALLOWED.includes(dir)) return NextResponse.json({ error: 'Invalid dir' }, { status: 400 });
  try {
    return NextResponse.json(await listDir(`content/${dir}`));
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
