import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SUBJECTS, REF } from '../data/topics';

const TIER_BORDER = { 1: 'border-l-error', 2: 'border-l-warning', 3: 'border-l-info' };

export default function TopicChecklist() {
  const [store, setStore] = useLocalStorage('cse-topic-checklist-v1', {});
  const [tier, setTier] = useState('all');
  const [mustOnly, setMustOnly] = useState(false);

  const toggle = (tid) => setStore((s) => ({ ...s, [tid]: !s[tid] }));

  const visible = useMemo(
    () => SUBJECTS.filter((s) => tier === 'all' || String(s.tier) === tier),
    [tier]
  );

  const totals = useMemo(() => {
    let total = 0, done = 0;
    SUBJECTS.forEach((s) =>
      s.groups.forEach((gp, gi) =>
        gp.t.forEach((_, ti) => {
          total++;
          if (store[`${s.id}-${gi}-${ti}`]) done++;
        })
      )
    );
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [store]);

  const shows = (star) => !mustOnly || star >= 1;

  return (
    <>
      <header className="relative overflow-hidden py-12 pb-8 border-b border-base-300">
        <div className="masthead-gradient" />
        <div className="relative z-10 max-w-5xl mx-auto px-5">
          <p className="text-xs tracking-[.16em] uppercase font-bold text-primary">Study Guide · exact topics</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-3 tracking-tight">
            Topic Checklist — every subject, broken to atoms
          </h1>
          <p className="text-base-content/60 max-w-2xl text-sm leading-relaxed">
            {SUBJECTS.length} subjects, each split into the exact topics that decide the marks. Overwhelmed?
            Flip <strong>★ Must-know only</strong>. Progress saves in your browser.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-xs text-base-content/60">
            <span className="inline-flex items-center gap-1.5"><span className="badge badge-error badge-xs">★★</span> near-guaranteed — learn first</span>
            <span className="inline-flex items-center gap-1.5"><span className="badge badge-warning badge-xs">★</span> high-frequency — learn second</span>
            <span>📘 = the standard textbook + chapter per group</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-[3px] bg-gradient-to-r from-primary to-primary/20 rounded" />
      </header>

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Toolbar */}
        <div className="sticky top-16 z-20 bg-base-100/80 backdrop-blur-xl border-b border-base-300 py-3 -mx-5 px-5 flex flex-wrap gap-2 items-center">
          <div className="flex gap-1.5">
            {['all', '1', '2', '3'].map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`btn btn-xs ${tier === t ? 'btn-primary' : 'btn-ghost'}`}
              >
                {t === 'all' ? 'All' : `Tier ${t}`}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMustOnly((v) => !v)}
            className={`btn btn-xs ${mustOnly ? 'btn-error' : 'btn-outline btn-error'}`}
          >
            ★ Must-know only
          </button>
          <div className="flex items-center gap-2 ml-auto min-w-[180px]">
            <progress className="progress progress-primary flex-1 h-2" value={totals.pct} max="100" />
            <span className="text-xs font-mono text-base-content/60 whitespace-nowrap">
              {totals.done}/{totals.total}
            </span>
          </div>
        </div>

        {/* Subjects */}
        <div className="grid gap-3 mt-6">
          {visible.map((s, si) => {
            const ref = REF[s.id];
            let sTotal = 0, sDone = 0;
            s.groups.forEach((gp, gi) => gp.t.forEach((_, ti) => { sTotal++; if (store[`${s.id}-${gi}-${ti}`]) sDone++; }));
            const sPct = sTotal ? Math.round((sDone / sTotal) * 100) : 0;
            const complete = sDone === sTotal;

            return (
              <div key={s.id} className={`collapse collapse-arrow bg-base-200 border border-base-300 border-l-4 ${TIER_BORDER[s.tier]} rounded-xl shadow-sm`}>
                <input type="checkbox" defaultChecked={si === 0 && tier === 'all'} />
                <div className="collapse-title flex items-center gap-3 pr-12 flex-wrap">
                  <span className="font-serif font-semibold text-sm flex-1 min-w-[140px]">
                    {s.name} <span className="font-mono text-xs text-base-content/50">{s.code}</span>
                  </span>
                  <span className="badge badge-ghost badge-xs font-mono">{s.sem}</span>
                  <progress className={`progress w-20 h-1.5 ${complete ? 'progress-success' : 'progress-primary'}`} value={sPct} max="100" />
                  <span className="text-xs font-mono text-base-content/50 w-12 text-right">{sDone}/{sTotal}</span>
                </div>
                <div className="collapse-content">
                  {ref && (
                    <div className="bg-base-100 border border-base-300 border-l-[3px] border-l-primary rounded-lg px-3 py-2 mb-3 text-xs">
                      <p>📘 <span className="font-serif font-bold">{ref.book}</span></p>
                      <p className="text-base-content/50 mt-0.5">{ref.drive}</p>
                    </div>
                  )}
                  {s.groups.map((gp, gi) => {
                    const groupTopics = gp.t.filter(([, star]) => shows(star));
                    if (groupTopics.length === 0) return null;
                    return (
                      <div key={gi} className="mt-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-base-content/50 border-b border-base-300 pb-1 mb-2">
                          {gp.g}
                          {ref?.g?.[gi] && <span className="font-mono normal-case tracking-normal text-primary ml-2">{ref.g[gi]}</span>}
                        </div>
                        <ul className="grid gap-2">
                          {gp.t.map(([text, star, q], ti) => {
                            if (!shows(star)) return null;
                            const tid = `${s.id}-${gi}-${ti}`;
                            const checked = !!store[tid];
                            return (
                              <li key={ti} className="grid grid-cols-[auto_1fr_auto] gap-2.5 items-start">
                                <input type="checkbox" className="checkbox checkbox-primary checkbox-xs mt-0.5" checked={checked} onChange={() => toggle(tid)} />
                                <label onClick={() => toggle(tid)} className={`text-sm cursor-pointer leading-snug ${checked ? 'line-through text-base-content/40' : ''}`}>
                                  {text}
                                  {q && <span className="block text-xs italic text-base-content/50 mt-0.5">e.g. {q}</span>}
                                </label>
                                {star === 2 && <span className="badge badge-error badge-xs font-bold">★★</span>}
                                {star === 1 && <span className="badge badge-warning badge-xs font-bold">★</span>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="alert bg-primary/10 border border-primary/30 mt-8 text-sm">
          <span>
            <strong className="text-primary">How to use it without drowning:</strong> pick one subject, turn on
            <strong> ★ Must-know only</strong>, and learn just those 6–10 core topics — that alone clears most of a
            written paper. The ★★ topics double as your safest demo-class and viva answers.
          </span>
        </div>

        <footer className="mt-12 border-t border-base-300 pt-4 pb-8 text-xs text-base-content/40 max-w-prose leading-relaxed">
          Topic weighting (★★/★) reflects general private-uni frequency — a specific university's syllabus overrides it.
          Part of the CSE Lecturer Notice Board.
        </footer>
      </div>
    </>
  );
}
