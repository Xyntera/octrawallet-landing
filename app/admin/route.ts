import { NextResponse } from 'next/server';

export function GET() {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager | Octra Wallet</title>
</head>
<body>
  <div id="nc-root"></div>
  <script>
    window.onerror = function(msg, src, line) {
      var d = document.createElement('div');
      d.style.cssText = 'font-family:monospace;padding:2rem;color:red';
      d.textContent = 'CMS Error: ' + msg + ' — ' + src + ':' + line;
      document.body.appendChild(d);
    };
  </script>
  <script src="https://unpkg.com/decap-cms@3.1.2/dist/decap-cms.js"></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
