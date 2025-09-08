import React, { useMemo, useRef, useState, useEffect } from 'react';
import './App.css';

/**
 * Theme definition aligned with Soft Mono minimalist style.
 */
const SOFT_MONO_THEMES = {
  SoftMono: {
    name: 'Soft Mono',
    description: 'Monochrome with warm touches',
    primary: '#6B7280',
    secondary: '#9CA3AF',
    success: '#10B981',
    error: '#EF4444',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#111827',
    subtle: '#E5E7EB',
  },
  WarmMono: {
    name: 'Warm Mono',
    description: 'Softer contrasts, warmer subtle surfaces',
    primary: '#6B7280',
    secondary: '#A8B0BA',
    success: '#10B981',
    error: '#EF4444',
    background: '#FAFAF9',
    surface: '#FFFFFF',
    text: '#111827',
    subtle: '#ECECEC',
  },
  DeepMono: {
    name: 'Deep Mono',
    description: 'Darker grayscale with crisp text',
    primary: '#4B5563',
    secondary: '#9CA3AF',
    success: '#10B981',
    error: '#EF4444',
    background: '#F3F4F6',
    surface: '#FFFFFF',
    text: '#111827',
    subtle: '#E5E7EB',
  },
};

/**
 * Utilities
 */
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// PUBLIC_INTERFACE
export function useSoftMonoTheme(activeKey = 'SoftMono') {
  /**
   * Provides current theme tokens and writes them to CSS variables for global styling.
   */
  const theme = useMemo(() => SOFT_MONO_THEMES[activeKey] || SOFT_MONO_THEMES.SoftMono, [activeKey]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--sm-bg', theme.background);
    root.style.setProperty('--sm-surface', theme.surface);
    root.style.setProperty('--sm-text', theme.text);
    root.style.setProperty('--sm-primary', theme.primary);
    root.style.setProperty('--sm-secondary', theme.secondary);
    root.style.setProperty('--sm-success', theme.success);
    root.style.setProperty('--sm-error', theme.error);
    root.style.setProperty('--sm-subtle', theme.subtle);
  }, [theme]);

  return theme;
}

/**
 * Small, self-contained UI components
 */

// PUBLIC_INTERFACE
export function TopNav({ themeKey, onThemeChange }) {
  /** Minimal top navigation with title and theme selector. */
  return (
    <nav className="sm-nav">
      <div className="sm-nav__brand">
        <span className="sm-dot" aria-hidden>●</span>
        <span className="sm-brand-text">Profile Cards</span>
      </div>
      <div className="sm-nav__controls">
        <label className="sm-label" htmlFor="theme-select">Theme</label>
        <select
          id="theme-select"
          className="sm-select"
          value={themeKey}
          onChange={(e) => onThemeChange(e.target.value)}
          aria-label="Select theme"
        >
          {Object.keys(SOFT_MONO_THEMES).map((k) => (
            <option key={k} value={k}>{SOFT_MONO_THEMES[k].name}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
export function ProfileCard({ profile, interactive = true }) {
  /**
   * A minimalist, interactive user profile card following Soft Mono style.
   * - profile: { name, title, bio, avatarUrl, links: [{label, url}] }
   */
  const { name, title, bio, avatarUrl, links = [] } = profile;

  return (
    <article className={`sm-card ${interactive ? 'sm-card--interactive' : ''}`} role="region" aria-label="Profile preview">
      <div className="sm-card__header">
        <div className="sm-avatar" aria-hidden>
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${name || 'User'} avatar`} />
          ) : (
            <div className="sm-avatar__placeholder">{(name || 'U').slice(0, 1).toUpperCase()}</div>
          )}
        </div>
        <div className="sm-card__identity">
          <h2 className="sm-card__name">{name || 'Your Name'}</h2>
          <p className="sm-card__title">{title || 'Your Title'}</p>
        </div>
      </div>
      <p className="sm-card__bio">{bio || 'Short personal bio goes here. Keep it concise and meaningful.'}</p>
      {links.length > 0 && (
        <ul className="sm-card__links">
          {links.map((l, i) => (
            <li key={`${l.label}-${i}`}>
              <a className="sm-link" href={l.url || '#'} target="_blank" rel="noreferrer">
                {l.label || 'Link'}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

// PUBLIC_INTERFACE
export function CardEditor({ value, onChange }) {
  /**
   * Minimal form editor for card content.
   */
  const handleArrayChange = (idx, key, v) => {
    const next = [...(value.links || [])];
    next[idx] = { ...(next[idx] || {}), [key]: v };
    onChange({ ...value, links: next });
  };

  const addLink = () => {
    onChange({ ...value, links: [...(value.links || []), { label: '', url: '' }] });
  };

  const removeLink = (idx) => {
    const next = [...(value.links || [])];
    next.splice(idx, 1);
    onChange({ ...value, links: next });
  };

  return (
    <form className="sm-form" onSubmit={(e) => e.preventDefault()} aria-label="Profile editor">
      <div className="sm-field">
        <label className="sm-label">Name</label>
        <input
          className="sm-input"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Jane Doe"
        />
      </div>
      <div className="sm-field">
        <label className="sm-label">Title</label>
        <input
          className="sm-input"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          placeholder="Product Designer"
        />
      </div>
      <div className="sm-field">
        <label className="sm-label">Bio</label>
        <textarea
          className="sm-textarea"
          rows={4}
          value={value.bio}
          onChange={(e) => onChange({ ...value, bio: e.target.value })}
          placeholder="Brief bio that highlights your role and interests."
        />
      </div>
      <div className="sm-field">
        <label className="sm-label">Avatar URL</label>
        <input
          className="sm-input"
          value={value.avatarUrl}
          onChange={(e) => onChange({ ...value, avatarUrl: e.target.value })}
          placeholder="https://example.com/avatar.png"
        />
      </div>

      <div className="sm-field">
        <label className="sm-label">Links</label>
        <div className="sm-links">
          {(value.links || []).map((l, idx) => (
            <div className="sm-link-row" key={idx}>
              <input
                className="sm-input"
                placeholder="Label (e.g., GitHub)"
                value={l.label}
                onChange={(e) => handleArrayChange(idx, 'label', e.target.value)}
              />
              <input
                className="sm-input"
                placeholder="https://github.com/username"
                value={l.url}
                onChange={(e) => handleArrayChange(idx, 'url', e.target.value)}
              />
              <button className="sm-btn sm-btn--ghost" type="button" onClick={() => removeLink(idx)} aria-label="Remove link">
                Remove
              </button>
            </div>
          ))}
        </div>
        <button className="sm-btn" type="button" onClick={addLink}>Add link</button>
      </div>
    </form>
  );
}

// PUBLIC_INTERFACE
export function ExportBar({ onExportPNG, onExportJSON }) {
  /** Bar with subtle primary button and ghost secondary. */
  return (
    <div className="sm-export">
      <button className="sm-btn sm-btn--primary" type="button" onClick={onExportPNG}>Export PNG</button>
      <button className="sm-btn sm-btn--ghost" type="button" onClick={onExportJSON}>Export JSON</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main app with top navigation, center editor + preview, theme selector, and export.
   */
  const [themeKey, setThemeKey] = useState('SoftMono');
  useSoftMonoTheme(themeKey);

  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    avatarUrl: '',
    links: [],
  });

  const previewRef = useRef(null);

  const handleExportPNG = async () => {
    // Lazy import html-to-image to avoid adding weight until needed
    try {
      const { toPng } = await import('html-to-image');
      const node = previewRef.current;
      if (!node) return;
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: window.devicePixelRatio || 2,
        quality: 1.0,
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--sm-bg').trim() || '#F9FAFB'
      });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      downloadBlob(blob, 'profile-card.png');
    } catch (e) {
      console.error('PNG export failed:', e);
      alert('Export failed. Please try again.');
    }
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify({ themeKey, profile }, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'profile-card.json');
  };

  return (
    <div className="sm-app">
      <TopNav themeKey={themeKey} onThemeChange={setThemeKey} />
      <main className="sm-main">
        <section className="sm-panel sm-panel--editor" aria-label="Editor panel">
          <h1 className="sm-h1">Create your card</h1>
          <p className="sm-muted">Ultra-clean, minimalist editor with live preview. Keep it simple.</p>
          <CardEditor value={profile} onChange={setProfile} />
          <ExportBar onExportPNG={handleExportPNG} onExportJSON={handleExportJSON} />
        </section>
        <section className="sm-panel sm-panel--preview" aria-label="Preview panel">
          <div className="sm-preview-wrap">
            <div ref={previewRef} className="sm-card-frame" aria-label="Exportable card region">
              <ProfileCard profile={profile} />
            </div>
          </div>
        </section>
      </main>
      <footer className="sm-footer" aria-label="Footer">
        <span className="sm-muted">Soft Mono • Minimalist</span>
      </footer>
    </div>
  );
}

export default App;
