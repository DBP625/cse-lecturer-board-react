import { useState, useEffect } from 'react';
import { timeAgo, staleness } from '../utils/helpers';

export default function LiveFeed() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('notices.json', { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw 0; return r.json(); })
      .then((data) => {
        setItems((data && data.items) || []);
        setMeta(data);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const cls = meta ? staleness(meta.generated) : '';

  if (loading) {
    return (
      <section className="mt-8">
        <h2 className="text-xl font-serif font-bold mb-3 flex items-center gap-2">
          🆕 Latest Postings
          <span className="loading loading-dots loading-xs text-primary" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-200 border border-base-300 border-l-4 border-l-base-300 shadow-sm">
              <div className="card-body p-4 gap-2">
                <div className="skeleton h-3 w-16" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex items-baseline gap-3 mb-3">
        <h2 className="text-xl font-serif font-bold">🆕 Latest Postings</h2>
        <span className="text-xs text-base-content/50 inline-flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${
            cls === 'stale' ? 'bg-error' : cls === 'warn' ? 'bg-warning' : 'bg-primary animate-pulse'
          }`} />
          updated {meta ? timeAgo(meta.generated) : 'unknown'} · {items.length} live
        </span>
      </div>

      {error ? (
        <p className="text-sm italic text-base-content/50">
          Live feed not available yet. Set up Google Alerts + the GitHub Action to see auto-fetched postings here.
        </p>
      ) : items.length === 0 ? (
        <p className="text-sm italic text-base-content/50">
          Feed is connected and running — no new CSE/lecturer postings in it right now. New matches will show up here automatically.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it, i) => (
            <div key={i} className="card bg-base-200 border border-base-300 border-l-4 border-l-primary shadow-sm card-glow">
              <div className="card-body p-4 gap-1.5">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="badge badge-outline badge-xs font-mono">{it.source || 'link'}</span>
                  {it.published && <span className="text-[10px] font-mono text-base-content/50">{it.published}</span>}
                  {it.deadline && <span className="badge badge-error badge-outline badge-xs font-mono">deadline {it.deadline}</span>}
                </div>
                <h3 className="font-serif text-sm font-semibold leading-snug">
                  <a href={it.url} target="_blank" rel="noopener noreferrer" className="link link-hover">
                    {it.title || it.url} ↗
                  </a>
                </h3>
                {it.snippet && <p className="text-xs text-base-content/50 line-clamp-2">{it.snippet}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
