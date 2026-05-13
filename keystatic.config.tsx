import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'Xyntera/octrawallet-landing',
    branchPrefix: 'keystatic/',
  },
  ui: {
    brand: { name: 'Octra Wallet CMS' },
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { data: 'yaml', contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        author: fields.text({ label: 'Author', defaultValue: 'Glaqz' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => String(props.value) || 'Tag',
        }),
        body: fields.markdoc({ label: 'Body' }),
      },
    }),
    docs: collection({
      label: 'Documentation',
      slugField: 'title',
      path: 'content/docs/*',
      format: { data: 'yaml', contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        section: fields.text({ label: 'Section', defaultValue: 'General' }),
        order: fields.integer({ label: 'Order', defaultValue: 99 }),
        body: fields.markdoc({ label: 'Body' }),
      },
    }),
    changelog: collection({
      label: 'Changelog',
      slugField: 'version',
      path: 'content/changelog/*',
      format: { data: 'yaml', contentField: 'body' },
      schema: {
        version: fields.slug({ name: { label: 'Version' } }),
        date: fields.date({ label: 'Date' }),
        body: fields.markdoc({ label: 'Body' }),
      },
    }),
  },
});
