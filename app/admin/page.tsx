'use client';

import { useState } from 'react';

type Col = 'blog' | 'docs' | 'changelog';

interface FileItem { name: string; path: string; sha: string }

interface EditorData {
  path: string;
  sha: string | undefined;
  frontmatter: Record<string, unknown>;
  body: string;
}

const COL_LABELS: Record<Col, string> = { blog: 'Blog', docs: 'Docs', changelog: 'Changelog' };

const DEFAULT_FM: Record<Col, Record<string, unknown>> = {
  blog: { title: '', date: today(), description: '', author: 'Glaqz', tags: [] },
  docs: { title: '', description: '', section: 'General', order: 99 },
  changelog: { version: '', date: today() },
};

function today() { return new Date().toISOString().split('T')[0]; }

const S = {
  page: { minHeight: '100vh', background: '#0d0d0d', color: '#e2e8f0', fontFamily: 'system-ui,sans-serif' } as React.CSSProperties,
  header: { background: '#111', borderBottom: '1px solid #1e1e1e', padding: '0.9rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' } as React.CSSProperties,
  logo: { fontWeight: 700, fontSize: '1rem', color: '#fff', letterSpacing: '-0.01em' } as React.CSSProperties,
  navRow: { display: 'flex', gap: '0.4rem' } as React.CSSProperties,
  tab: (active: boolean) => ({ padding: '0.4rem 0.9rem', borderRadius: '6px', border: `1px solid ${active ? '#6366f1' : '#2a2a2a'}`, background: active ? '#6366f115' : 'transparent', color: active ? '#a5b4fc' : '#888', cursor: 'pointer', fontSize: '0.85rem' } as React.CSSProperties),
  main: { maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' } as React.CSSProperties,
  loginWrap: { maxWidth: '380px', margin: '6rem auto', background: '#111', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '2.5rem' } as React.CSSProperties,
  h1: { fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' } as React.CSSProperties,
  h2: { fontSize: '1.15rem', fontWeight: 600, color: '#fff', margin: 0 } as React.CSSProperties,
  label: { display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: 500, marginBottom: '0.35rem', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  input: { width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid #2a2a2a', background: '#181818', color: '#e2e8f0', fontSize: '0.9rem', boxSizing: 'border-box' as const, outline: 'none' },
  textarea: { width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #2a2a2a', background: '#181818', color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'ui-monospace,monospace', boxSizing: 'border-box' as const, resize: 'vertical' as const, lineHeight: 1.65, outline: 'none' },
  btn: { padding: '0.65rem 1.4rem', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' } as React.CSSProperties,
  btnGhost: { padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #2a2a2a', background: 'transparent', color: '#888', fontSize: '0.85rem', cursor: 'pointer' } as React.CSSProperties,
  card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '0.9rem 1.2rem', cursor: 'pointer', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as React.CSSProperties,
  field: { marginBottom: '1.1rem' } as React.CSSProperties,
  err: { color: '#f87171', fontSize: '0.85rem' } as React.CSSProperties,
  ok: { color: '#4ade80', fontSize: '0.85rem' } as React.CSSProperties,
  grid: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' } as React.CSSProperties,
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' } as React.CSSProperties,
  actions: { display: 'flex', gap: '0.6rem', alignItems: 'center' } as React.CSSProperties,
};

export default function AdminPage() {
  const [view, setView] = useState<'login' | 'list' | 'editor'>('login');
  const [pwd, setPwd] = useState('');
  const [token, setToken] = useState('');
  const [col, setCol] = useState<Col>('blog');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [editor, setEditor] = useState<EditorData | null>(null);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  const auth = { Authorization: `Bearer ${token}` };

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    const res = await fetch('/api/admin/files?dir=blog', { headers: { Authorization: `Bearer ${pwd}` } });
    setBusy(false);
    if (res.ok) { setToken(pwd); await loadFiles('blog', pwd); }
    else setErr('Wrong password');
  }

  async function loadFiles(c: Col, t?: string) {
    setBusy(true); setErr(''); setCol(c);
    const res = await fetch(`/api/admin/files?dir=${c}`, { headers: { Authorization: `Bearer ${t ?? token}` } });
    const data = await res.json();
    setFiles(Array.isArray(data) ? data : []);
    setBusy(false); setView('list');
  }

  async function openFile(f: FileItem) {
    setBusy(true); setErr('');
    const res = await fetch(`/api/admin/file?path=${encodeURIComponent(f.path)}`, { headers: auth });
    const data = await res.json();
    setEditor({ path: f.path, sha: data.sha, frontmatter: data.frontmatter, body: data.body });
    setBusy(false); setView('editor');
  }

  function newFile() {
    const slug = col === 'changelog' ? 'v1-0-0' : 'new-post';
    setEditor({ path: `content/${col}/${slug}.md`, sha: undefined, frontmatter: { ...DEFAULT_FM[col] }, body: '' });
    setErr(''); setOk(''); setView('editor');
  }

  async function save() {
    if (!editor) return;
    setSaving(true); setErr(''); setOk('');
    const res = await fetch('/api/admin/file', {
      method: 'PUT',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify(editor),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setEditor(p => p ? { ...p, sha: data.sha } : null);
      setOk('Saved to GitHub ✓');
      setTimeout(() => setOk(''), 4000);
    } else {
      setErr(data.error || 'Save failed');
    }
  }

  function logout() { setToken(''); setPwd(''); setView('login'); setErr(''); setOk(''); }

  function fm(key: string, val: unknown) {
    setEditor(p => p ? { ...p, frontmatter: { ...p.frontmatter, [key]: val } } : null);
  }

  if (view === 'login') return (
    <div style={S.page}>
      <div style={S.loginWrap}>
        <div style={S.h1}>Octra CMS</div>
        <form onSubmit={login}>
          <div style={S.field}>
            <label style={S.label}>Password</label>
            <input type="password" style={S.input} value={pwd} onChange={e => setPwd(e.target.value)} autoFocus />
          </div>
          {err && <p style={{ ...S.err, marginBottom: '0.75rem' }}>{err}</p>}
          <button type="submit" style={S.btn} disabled={busy}>{busy ? 'Checking…' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );

  if (view === 'list') return (
    <div style={S.page}>
      <header style={S.header}>
        <span style={S.logo}>Octra CMS</span>
        <div style={S.actions}>
          <nav style={S.navRow}>
            {(['blog', 'docs', 'changelog'] as Col[]).map(c => (
              <button key={c} style={S.tab(col === c)} onClick={() => loadFiles(c)}>{COL_LABELS[c]}</button>
            ))}
          </nav>
          <button style={S.btnGhost} onClick={logout}>Sign out</button>
        </div>
      </header>
      <div style={S.main}>
        <div style={S.topbar}>
          <span style={S.h2}>{COL_LABELS[col]}</span>
          <button style={S.btn} onClick={newFile}>+ New</button>
        </div>
        {err && <p style={S.err}>{err}</p>}
        {busy ? <p style={{ color: '#555' }}>Loading…</p>
          : files.length === 0 ? <p style={{ color: '#555' }}>No files yet. Create one.</p>
          : files.map(f => (
            <div key={f.path} style={S.card} onClick={() => openFile(f)}>
              <span style={{ color: '#e2e8f0' }}>{f.name.replace('.md', '')}</span>
              <span style={{ color: '#444', fontSize: '0.8rem' }}>Edit →</span>
            </div>
          ))}
      </div>
    </div>
  );

  if (view === 'editor' && editor) {
    const f = editor.frontmatter;
    return (
      <div style={S.page}>
        <header style={S.header}>
          <span style={S.logo}>Octra CMS</span>
          <div style={S.actions}>
            {ok && <span style={S.ok}>{ok}</span>}
            {err && <span style={S.err}>{err}</span>}
            <button style={S.btnGhost} onClick={() => loadFiles(col)}>← Back</button>
            <button style={S.btnGhost} onClick={logout}>Sign out</button>
            <button style={S.btn} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </header>
        <div style={S.main}>
          <div style={{ ...S.field, marginBottom: '1.5rem' }}>
            <label style={S.label}>File path</label>
            <input style={S.input} value={editor.path} onChange={e => setEditor(p => p ? { ...p, path: e.target.value } : null)} />
          </div>
          <div style={S.grid}>
            <div>
              {col === 'blog' && <>
                <div style={S.field}><label style={S.label}>Title</label><input style={S.input} value={String(f.title ?? '')} onChange={e => fm('title', e.target.value)} /></div>
                <div style={S.field}><label style={S.label}>Date</label><input type="date" style={S.input} value={String(f.date ?? '')} onChange={e => fm('date', e.target.value)} /></div>
                <div style={S.field}><label style={S.label}>Author</label><input style={S.input} value={String(f.author ?? '')} onChange={e => fm('author', e.target.value)} /></div>
                <div style={S.field}><label style={S.label}>Description</label><textarea style={{ ...S.textarea, minHeight: '80px' }} value={String(f.description ?? '')} onChange={e => fm('description', e.target.value)} /></div>
                <div style={S.field}><label style={S.label}>Tags (comma separated)</label><input style={S.input} value={Array.isArray(f.tags) ? (f.tags as string[]).join(', ') : String(f.tags ?? '')} onChange={e => fm('tags', e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean))} /></div>
              </>}
              {col === 'docs' && <>
                <div style={S.field}><label style={S.label}>Title</label><input style={S.input} value={String(f.title ?? '')} onChange={e => fm('title', e.target.value)} /></div>
                <div style={S.field}><label style={S.label}>Section</label><input style={S.input} value={String(f.section ?? '')} onChange={e => fm('section', e.target.value)} /></div>
                <div style={S.field}><label style={S.label}>Order</label><input type="number" style={S.input} value={Number(f.order ?? 99)} onChange={e => fm('order', parseInt(e.target.value))} /></div>
                <div style={S.field}><label style={S.label}>Description</label><textarea style={{ ...S.textarea, minHeight: '80px' }} value={String(f.description ?? '')} onChange={e => fm('description', e.target.value)} /></div>
              </>}
              {col === 'changelog' && <>
                <div style={S.field}><label style={S.label}>Version</label><input style={S.input} value={String(f.version ?? '')} onChange={e => fm('version', e.target.value)} /></div>
                <div style={S.field}><label style={S.label}>Date</label><input type="date" style={S.input} value={String(f.date ?? '')} onChange={e => fm('date', e.target.value)} /></div>
              </>}
            </div>
            <div style={S.field}>
              <label style={S.label}>Content (Markdown)</label>
              <textarea style={{ ...S.textarea, minHeight: '520px' }} value={editor.body} onChange={e => setEditor(p => p ? { ...p, body: e.target.value } : null)} spellCheck={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
