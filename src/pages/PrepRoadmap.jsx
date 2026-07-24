import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  DRIVE, ASSETS, FLOORS, DRILL, DEMO, REHEARSAL,
  VIVA_PITCH, VIVA_COURSES, VIVA_QS, BEFORE_CALL,
} from '../data/prep';

function verdict(cm, sm, hm, c, s, h) {
  if (cm === null) return { cls: 'unk', text: 'record-based' };
  if (isNaN(c)) return { cls: 'unk', text: 'enter CGPA' };
  const ok = c >= cm && (sm === null || isNaN(s) || s >= sm) && (hm === null || isNaN(h) || h >= hm);
  const pending = sm !== null && (isNaN(s) || isNaN(h));
  return { cls: ok ? 'pass' : 'miss', text: ok ? (pending ? 'clear (CGPA)' : 'clear') : 'below floor' };
}

const VCLS = {
  pass: 'border-success/50 [&_.v]:bg-success/15 [&_.v]:text-success',
  miss: 'border-error/50 [&_.v]:bg-error/15 [&_.v]:text-error',
  unk: '[&_.v]:bg-base-300/40 [&_.v]:text-base-content/50',
};

export default function PrepRoadmap() {
  const [store, setStore] = useLocalStorage('cse-prep-roadmap-v1', { nums: {}, checks: {} });
  const nums = store.nums || {};
  const c = parseFloat(nums.cgpa), s = parseFloat(nums.ssc), h = parseFloat(nums.hsc);

  const setNum = (k, v) => setStore((st) => ({ ...st, nums: { ...st.nums, [k]: v } }));
  const toggleCheck = (i) => setStore((st) => ({ ...st, checks: { ...st.checks, [i]: !st.checks?.[i] } }));
  const done = REHEARSAL.filter((_, i) => store.checks?.[i]).length;

  return (
    <>
      <header className="relative overflow-hidden py-12 pb-8 border-b border-base-300">
        <div className="masthead-gradient" />
        <div className="relative z-10 max-w-5xl mx-auto px-5">
          <p className="text-xs tracking-[.16em] uppercase font-bold text-primary">Preparation · roadmap</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-3 tracking-tight">CSE Lecturer Prep Roadmap</h1>
          <p className="text-base-content/60 max-w-2xl text-sm leading-relaxed">
            Mapped to material you already own — your semester Questions folders, your Jobs stash. Where to apply lives on
            the notice board; this makes you ready when they call.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-[3px] bg-gradient-to-r from-primary to-primary/20 rounded" />
      </header>

      <div className="max-w-5xl mx-auto px-5 py-8 grid gap-12">
        {/* Step 0 — assets */}
        <section>
          <h2 className="text-xl font-serif font-bold border-b border-base-300 pb-2 mb-4">Step 0 — you already own the question bank</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ASSETS.map((a, i) => (
              <div key={i} className="card bg-base-200 border border-base-300 border-l-4 border-l-primary shadow-sm">
                <div className="card-body p-4 gap-2">
                  <h3 className="font-serif text-sm font-semibold">{a.h}</h3>
                  <p className="text-xs" dangerouslySetInnerHTML={{ __html: a.p }} />
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {a.links.map(([label, id]) => (
                      <a key={label} href={a.external ? id : DRIVE + id} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary btn-xs">{label} ↗</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1 — eligibility */}
        <section>
          <h2 className="text-xl font-serif font-bold border-b border-base-300 pb-2 mb-4">Step 1 — eligibility, in numbers</h2>
          <div className="card bg-base-200 border border-base-300 shadow-sm">
            <div className="card-body p-5">
              <div className="flex flex-wrap gap-4">
                {[['cgpa', 'CGPA (/4.00)', '3.62'], ['ssc', 'SSC GPA (/5.00)', '5.00'], ['hsc', 'HSC GPA (/5.00)', '5.00']].map(([k, label, ph]) => (
                  <label key={k} className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-base-content/50">
                    {label}
                    <input type="number" step="0.01" placeholder={`e.g. ${ph}`} value={nums[k] || ''} onChange={(e) => setNum(k, e.target.value)}
                      className="input input-bordered input-sm w-32 font-mono" />
                  </label>
                ))}
              </div>
              <p className="text-[11px] italic text-base-content/50 mt-2 mb-3">Saved to your browser only — never sent anywhere. Blank = university states no public floor.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {FLOORS.map(([name, cm, sm, hm, note]) => {
                  const v = verdict(cm, sm, hm, c, s, h);
                  const req = cm === null ? 'no floor' : `≥${cm.toFixed(2)}${sm ? ` · S/H ≥${sm.toFixed(1)}` : ''}`;
                  return (
                    <div key={name} className={`flex justify-between items-center gap-2 border rounded-lg px-3 py-2 text-sm bg-base-100 border-base-300 ${VCLS[v.cls]}`}>
                      <span><b>{name}</b><br /><span className="text-[11px] font-mono text-base-content/50">{req}{note ? ` · ${note}` : ''}</span></span>
                      <span className="v text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded whitespace-nowrap">{v.text}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-base-content/50 mt-3">Enter your numbers and each board flips to <b>clear</b> / <b>below floor</b>. “No stated floor” boards read the whole record instead — CGPA + thesis + referees.</p>
            </div>
          </div>
        </section>

        {/* Step 2 — drill */}
        <section>
          <h2 className="text-xl font-serif font-bold border-b border-base-300 pb-2 mb-4">Step 2 — the 14-day drill</h2>
          <div className="overflow-x-auto rounded-xl border border-base-300">
            <table className="table table-sm">
              <thead><tr className="text-xs uppercase"><th>Day</th><th>Subject</th><th>AM — solve</th><th>PM — teach sheet</th></tr></thead>
              <tbody>
                {DRILL.map((r) => (
                  <tr key={r.day} className={r.rest ? 'bg-primary/5' : ''}>
                    <td className="font-mono font-bold text-primary">{r.day}</td>
                    {r.rest ? (
                      <td colSpan={2} className="text-sm">{r.full}</td>
                    ) : (
                      <>
                        <td className="text-sm">{r.subj} <span className="font-mono text-[11px] text-base-content/50">{r.code}</span></td>
                        <td className="text-sm">
                          {r.links.map(([label, id], i) => (
                            <span key={label}>
                              {i > 0 && ' / '}
                              <a href={DRIVE + id} target="_blank" rel="noopener noreferrer" className="link link-primary font-semibold">{label}</a>
                            </span>
                          ))}
                          {r.tail}
                        </td>
                      </>
                    )}
                    <td className="text-sm">{r.pm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 3 — demo + rehearsal */}
        <section>
          <h2 className="text-xl font-serif font-bold border-b border-base-300 pb-2 mb-4">Step 3 — demo class: three topics, rehearsed cold</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DEMO.map((d) => (
              <div key={d.h} className="card bg-base-200 border border-base-300 border-t-4 border-t-primary shadow-sm">
                <div className="card-body p-4 gap-1">
                  <h3 className="font-serif text-base font-semibold">{d.h}</h3>
                  <p className="font-mono text-[11px] text-base-content/50">{d.src}</p>
                  <p className="text-sm mt-1">{d.p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card bg-base-200 border border-base-300 shadow-sm mt-3">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-serif text-base font-semibold">Rehearsal loop</h3>
                <span className="badge badge-primary badge-sm font-mono ml-auto">{done}/{REHEARSAL.length}</span>
              </div>
              <ul className="grid gap-2">
                {REHEARSAL.map((item, i) => {
                  const ck = !!store.checks?.[i];
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary checkbox-sm mt-0.5" checked={ck} onChange={() => toggleCheck(i)} />
                      <label onClick={() => toggleCheck(i)} className={`text-sm cursor-pointer ${ck ? 'line-through text-base-content/40' : ''}`}>{item}</label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Step 4 — viva pack */}
        <section>
          <h2 className="text-xl font-serif font-bold border-b border-base-300 pb-2 mb-4">Step 4 — viva pack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-200 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <h3 className="font-serif text-base font-semibold mb-1">The 2-minute research pitch</h3>
                <div className="border-l-4 border-primary bg-primary/10 rounded-r-lg px-4 py-3 font-serif text-sm">{VIVA_PITCH}</div>
              </div>
            </div>
            <div className="card bg-base-200 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <h3 className="font-serif text-base font-semibold mb-1">“Which courses can you take?”</h3>
                <div className="flex flex-wrap gap-1.5">
                  {VIVA_COURSES.hot.map((t) => <span key={t} className="badge badge-primary badge-outline badge-sm">{t}</span>)}
                  {VIVA_COURSES.rest.map((t) => <span key={t} className="badge badge-ghost badge-sm">{t}</span>)}
                </div>
                <p className="text-sm mt-2">Say yes to labs unprompted — departments are short on sessional coverage and it signals a team player.</p>
              </div>
            </div>
            <div className="card bg-base-200 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <h3 className="font-serif text-base font-semibold mb-1">The other questions</h3>
                <ul className="grid gap-1.5 pl-1">
                  {VIVA_QS.map(([q, a]) => <li key={q} className="text-sm"><b>{q}</b> {a}</li>)}
                </ul>
              </div>
            </div>
            <div className="card bg-base-200 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <h3 className="font-serif text-base font-semibold mb-1">Before any interview call</h3>
                <ul className="list-disc pl-5 grid gap-1.5">
                  {BEFORE_CALL.map((b, i) => <li key={i} className="text-sm">{b}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-base-300 pt-4 pb-8 text-xs text-base-content/40 max-w-prose leading-relaxed">
          Built from the CUET CSE’20 drive + the salary/process research on the notice board. The eligibility checker runs entirely in your browser.
        </footer>
      </div>
    </>
  );
}
