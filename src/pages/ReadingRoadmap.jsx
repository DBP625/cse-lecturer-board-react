import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SUBJECTS, DRIVE_FOLDER, GOAL_LABEL, METHOD, WAVES, SKIP } from '../data/reading';

const TIER_BORDER = { 1: 'border-l-error', 2: 'border-l-warning', 3: 'border-l-info' };
const GOAL_BADGE = { w: 'badge-success', d: 'badge-warning', v: 'badge-secondary' };

export default function ReadingRoadmap() {
  const [store, setStore] = useLocalStorage('cse-reading-roadmap-v1', {});
  const [tier, setTier] = useState('all');
  const [goal, setGoal] = useState('all');

  const list = useMemo(() =>
    SUBJECTS
      .filter((s) => tier === 'all' || String(s.tier) === tier)
      .filter((s) => goal === 'all' || s.goals.includes(goal))
      .sort((a, b) => a.tier - b.tier),
    [tier, goal]
  );

  const studied = SUBJECTS.filter((s) => store[s.id]).length;
  const t1 = SUBJECTS.filter((s) => s.tier === 1).length;

  return (
    <>
      <header className="relative overflow-hidden py-12 pb-8 border-b border-base-300">
        <div className="masthead-gradient" />
        <div className="relative z-10 max-w-5xl mx-auto px-5">
          <p className="text-xs tracking-[.16em] uppercase font-bold text-primary">Study plan · what to read</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-3 tracking-tight">
            What to Read — Written Exam &amp; Viva
          </h1>
          <p className="text-base-content/60 max-w-2xl text-sm leading-relaxed">
            {SUBJECTS.length} subjects, each mapped to <strong>exactly which files to open, in order</strong> — no
            re-reading textbooks cover to cover.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-[3px] bg-gradient-to-r from-primary to-primary/20 rounded" />
      </header>

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Method */}
        <div className="card bg-base-200 border border-base-300 shadow-sm mb-8">
          <div className="card-body p-5">
            <h2 className="font-serif text-lg font-bold mb-1">The method — why your drive beats any textbook</h2>
            <p className="text-sm text-base-content/60 mb-3">
              Private-uni written tests reward recall of core courses. Your folders are already sorted by exam-value — read them in that order:
            </p>
            <div className="grid gap-2">
              {METHOD.map(([n, head, body]) => (
                <div key={n} className="grid grid-cols-[28px_1fr] gap-3 items-baseline p-3 bg-base-100 rounded-lg border border-base-300">
                  <span className="font-serif font-bold text-primary text-lg">{n}</span>
                  <p className="text-sm"><strong>{head}</strong> {body}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="bg-base-100 border border-base-300 rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40">Written test shape</p>
                <p className="font-serif text-lg font-bold text-primary">~40 + 20</p>
                <p className="text-xs">≈40 marks core-CS subject + ≈20 English. Subject prep = the Tier 1–2 cards below.</p>
              </div>
              <div className="bg-base-100 border border-base-300 rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40">Tier 1 = demo overlap</p>
                <p className="font-serif text-lg font-bold text-primary">5 subjects</p>
                <p className="text-xs">DS, Algorithms, DBMS, OS, Networks — highest yield <em>and</em> your demo topics. Spend most hours here.</p>
              </div>
              <div className="bg-base-100 border border-base-300 rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40">Viva ≠ written</p>
                <p className="font-serif text-lg font-bold text-primary">AI + ML</p>
                <p className="text-xs">The board probes your specialization. AI/ML files + your specialization carry the viva.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="sticky top-16 z-20 bg-base-100/80 backdrop-blur-xl border-b border-base-300 py-3 -mx-5 px-5 flex flex-wrap gap-2 items-center">
          <div className="flex gap-1.5">
            {[['all', 'All'], ['1', 'Tier 1'], ['2', 'Tier 2'], ['3', 'Tier 3']].map(([v, l]) => (
              <button key={v} onClick={() => setTier(v)} className={`btn btn-xs ${tier === v ? 'btn-primary' : 'btn-ghost'}`}>{l}</button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {[['all', 'Any goal'], ['w', 'Written'], ['d', 'Demo'], ['v', 'Viva']].map(([v, l]) => (
              <button key={v} onClick={() => setGoal(v)} className={`btn btn-xs ${goal === v ? 'btn-primary' : 'btn-ghost'}`}>{l}</button>
            ))}
          </div>
          <span className="text-xs text-base-content/50 ml-auto whitespace-nowrap">
            <strong className="text-base-content">{list.length}</strong> shown · {t1} in Tier 1 · studied <strong className="text-base-content">{studied}</strong>
          </span>
        </div>

        {/* Subject cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {list.map((s) => (
            <div key={s.id} className={`card bg-base-200 border border-base-300 border-l-4 ${TIER_BORDER[s.tier]} shadow-sm card-glow`}>
              <div className="card-body p-4 gap-2">
                <div className="flex items-start gap-2">
                  <h3 className="font-serif text-base font-semibold flex-1">
                    {s.name} <span className="font-mono text-xs text-base-content/50">{s.code}</span>
                  </h3>
                  <span className="badge badge-ghost badge-xs font-mono">{s.sem}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.goals.map((g) => (
                    <span key={g} className={`badge badge-xs ${GOAL_BADGE[g]}`}>{GOAL_LABEL[g]}</span>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40 mt-1">Open exactly these, in order</p>
                <ul className="grid gap-1">
                  {s.files.map(([rank, name, note], i) => (
                    <li key={i} className="grid grid-cols-[16px_1fr] gap-1.5 text-xs items-baseline">
                      <span className="font-mono font-bold text-primary">{rank}</span>
                      <span className="font-mono text-[11px]">{name}{note && <em className="not-italic font-sans text-base-content/50"> {note}</em>}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-base-content/40 mt-1">Master</p>
                <p className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: s.topics }} />
                <p className="text-xs italic text-base-content/60 border-t border-dashed border-base-300 pt-2 mt-1" dangerouslySetInnerHTML={{ __html: s.hook }} />
                <div className="flex items-center gap-2 mt-1">
                  <a href={DRIVE_FOLDER + s.fold} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary btn-xs">Open in Drive ↗</a>
                  <label className="flex items-center gap-1.5 text-xs text-base-content/60 cursor-pointer ml-auto">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" checked={!!store[s.id]} onChange={() => setStore((st) => ({ ...st, [s.id]: !st[s.id] }))} />
                    studied
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reading order */}
        <section className="mt-10">
          <h2 className="text-xl font-serif font-bold mb-3">Reading order — if you have two weeks</h2>
          <div className="grid gap-2">
            {WAVES.map((w) => (
              <div key={w.tag} className="card bg-base-200 border border-base-300 p-4 grid sm:grid-cols-[130px_1fr] gap-3 items-baseline">
                <div className="font-serif font-bold text-primary">{w.tag}<span className="block font-mono text-[11px] text-base-content/50 font-normal">{w.days}</span></div>
                <div>
                  <p className="font-mono text-xs">{w.subs}</p>
                  <p className="text-sm mt-1">{w.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="alert bg-error/10 border border-error/30 mt-3 text-sm">
            <span><strong className="text-error">Don't spend written-exam hours here:</strong> {SKIP}</span>
          </div>
        </section>

        <footer className="mt-12 border-t border-base-300 pt-4 pb-8 text-xs text-base-content/40 max-w-prose leading-relaxed">
          File names are the real ones in the CUET drive; “Open in Drive” jumps to that course folder. Part of the CSE Lecturer Notice Board.
        </footer>
      </div>
    </>
  );
}
