import { useRef, useEffect } from 'react';
import { daysLeft, fmtDate } from '../utils/helpers';

const STATE_COLORS = {
  open: 'border-l-error',
  reported: 'border-l-warning',
  rolling: 'border-l-primary',
  watch: 'border-l-base-300',
};
const STATE_BADGES = {
  open: 'badge-error',
  reported: 'badge-warning',
  rolling: 'badge-primary',
  watch: 'badge-ghost',
};

export default function UniCard({ uni, pinned, onTogglePin, status, onStatusChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { ref.current.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const dl = daysLeft(uni.deadline);

  return (
    <div
      ref={ref}
      className={`reveal-item card bg-base-200 border border-base-300 border-l-4 ${STATE_COLORS[uni.state] || ''} card-glow shadow-sm`}
    >
      <div className="card-body p-4 gap-2">
        {/* Header */}
        <div className="flex items-start gap-2">
          <h3 className="card-title text-base font-serif flex-1 leading-snug">{uni.name}</h3>
          <button
            onClick={() => onTogglePin(uni.id)}
            className={`btn btn-ghost btn-xs text-base ${pinned ? 'text-accent' : 'text-base-300 hover:text-accent'}`}
            aria-label={pinned ? 'Unpin' : 'Pin'}
            aria-pressed={pinned}
          >
            {pinned ? '📌' : '📍'}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-outline badge-sm">{uni.city}</span>
          <span className={`badge badge-sm ${STATE_BADGES[uni.state]}`}>{uni.state}</span>
          {uni.deadline && (
            <span className={`badge badge-sm font-mono ${dl !== null && dl < 0 ? 'badge-ghost line-through' : 'badge-error badge-outline'}`}>
              {dl !== null && dl >= 0 ? `${dl}d left · ${fmtDate(uni.deadline)}` : `past · ${fmtDate(uni.deadline)}`}
            </span>
          )}
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: uni.copy }} />
        {uni.how && (
          <p className="text-xs text-base-content/60" dangerouslySetInnerHTML={{ __html: `<strong class="text-base-content/80">How:</strong> ${uni.how}` }} />
        )}
        {uni.signal && (
          <p className="text-xs italic text-base-content/50">{uni.signal}</p>
        )}

        {/* Links */}
        {uni.links && uni.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {uni.links.map(([label, url], i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="link link-primary text-xs font-semibold no-underline hover:underline">
                {label} ↗
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-dashed border-base-300 pt-2 mt-1 flex items-center gap-2">
          <label className="text-[10px] uppercase tracking-widest font-semibold text-base-content/40">Status</label>
          <select
            value={status || ''}
            onChange={(e) => onStatusChange(uni.id, e.target.value)}
            className={`select select-bordered select-xs flex-1 max-w-40 font-semibold ${
              status === 'applied' ? 'border-primary text-primary' :
              status === 'interview' || status === 'offer' ? 'border-accent text-accent' : ''
            }`}
          >
            <option value="">—</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer 🎉</option>
            <option value="rejected">Rejected</option>
            <option value="skip">Skip</option>
          </select>
        </div>
      </div>
    </div>
  );
}
