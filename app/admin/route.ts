import { NextResponse } from 'next/server';

export function GET() {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager | Octra Wallet</title>
  <script src="https://unpkg.com/decap-cms@3.1.2/dist/decap-cms.js"></script>
</head>
<body>
  <script>
    CMS.init({
      config: {
        backend: {
          name: 'github',
          repo: 'Xyntera/octrawallet-landing',
          branch: 'main',
          base_url: 'https://octrawallet.com',
          auth_endpoint: 'api/auth'
        },
        media_folder: 'public/assets',
        public_folder: '/assets',
        site_url: 'https://octrawallet.com',
        collections: [
          {
            name: 'blog',
            label: 'Blog Posts',
            folder: 'content/blog',
            create: true,
            slug: '{{slug}}',
            fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Date', name: 'date', widget: 'datetime', format: 'YYYY-MM-DD' },
              { label: 'Description', name: 'description', widget: 'text' },
              { label: 'Author', name: 'author', widget: 'string', default: 'Glaqz' },
              { label: 'Tags', name: 'tags', widget: 'list', default: [] },
              { label: 'Body', name: 'body', widget: 'markdown' }
            ]
          },
          {
            name: 'docs',
            label: 'Documentation',
            folder: 'content/docs',
            create: true,
            slug: '{{slug}}',
            fields: [
              { label: 'Title', name: 'title', widget: 'string' },
              { label: 'Description', name: 'description', widget: 'text', required: false },
              { label: 'Section', name: 'section', widget: 'string', default: 'General' },
              { label: 'Order', name: 'order', widget: 'number', default: 99 },
              { label: 'Body', name: 'body', widget: 'markdown' }
            ]
          },
          {
            name: 'changelog',
            label: 'Changelog',
            folder: 'content/changelog',
            create: true,
            slug: '{{fields.version}}',
            fields: [
              { label: 'Version', name: 'version', widget: 'string' },
              { label: 'Date', name: 'date', widget: 'datetime', format: 'YYYY-MM-DD' },
              { label: 'Body', name: 'body', widget: 'markdown' }
            ]
          }
        ]
      }
    });
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
