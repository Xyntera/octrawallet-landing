import { NextResponse } from 'next/server';

export function GET() {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager | Octra Wallet</title>
  <script src="https://cdn.jsdelivr.net/npm/decap-cms@3.3.3/dist/decap-cms.js"></script>
</head>
<body></body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
