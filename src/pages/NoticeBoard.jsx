import { useState, useMemo, useEffect, useCallback } from 'react';
import { UNIS, REGION_LABEL } from '../data/universities';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { daysLeft } from '../utils/helpers';
import UniCard from '../components/UniCard';
import LiveFeed from '../components/LiveFeed';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';

const VERIFIED = '2026-07-24';

// Salary bands from Glassdoor/Bdjobs/circular research — entry monthly, BDT.
const SALARY_TIERS = [
  { name: 'Top tier · leading private', range: '৳48–75k', sub: 'BRAC · NSU · IUB · EWU · UIU · AIUB', note: 'Glassdoor pegs a BRACU lecturer near <strong>৳65k</strong> base (৳58–74k with extras); NSU sits at the top of the band. Provident fund, gratuity, and a Senior-Lecturer jump to ~৳130k.' },
  { name: 'Established mid-tier', range: '৳35–50k', sub: 'AUST · UAP · Daffodil · Green · BUBT · SEU · Stamford · Eastern · ULAB', note: 'Circulars say “negotiable” + medical, provident fund, two festival bonuses, Fri–Sat off, yearly review. A strong CGPA and a publication nudge the initial offer up.' },
  { name: 'Regional & newer', range: '৳25–40k', sub: 'Premier · Southern · Port City · CIU · USTC · BGC · Metropolitan · Leading · NEUB · WUB', note: 'Mostly “as per university pay scale.” Market-wide, the average BD lecturer sits near <strong>৳38.5k</strong>.' },
];

// Aggregator feeds where most private-uni circulars actually surface.
const PORTALS = [
  ['Bdjobs — Education & Training', 'https://bdjobs.com/h/jobs/?fcatId=4', 'main pipe'],
  ['BD Govt Job — university circulars', 'https://bdgovtjob.net/category/university-job-circular/', 'tracker'],
  ['EduResultBD — university jobs', 'https://eduresultbd.com/university-job-circular/', 'tracker'],
  ['LinkedIn — Lecturer CS, Bangladesh', 'https://www.linkedin.com/jobs/search/?keywords=lecturer%20computer%20science&location=Bangladesh', 'job board'],
  ['TBS Graduates', 'https://tbsgraduates.net/', 'job board'],
  ['UGC — approved private-uni list', 'http://www.ugc.gov.bd/', 'reference'],
];

// One-time email alerts that catch new circulars automatically.
const ALERTS = [
  { n: 1, h: 'LinkedIn job alert', p: 'Opens a Bangladesh lecturer search — flip the “Set alert” toggle to get emailed on every new match.',
    links: [['“Computer Science”', 'https://www.linkedin.com/jobs/search/?keywords=Lecturer%20Computer%20Science&location=Bangladesh'], ['“CSE”', 'https://www.linkedin.com/jobs/search/?keywords=Lecturer%20CSE&location=Bangladesh']] },
  { n: 2, h: 'Bdjobs job alert', p: 'The main pipe — most private-uni circulars cross-post here. Free account → My Bdjobs → Job Alert.',
    links: [['Open Education jobs', 'https://bdjobs.com/h/jobs/?fcatId=4']] },
  { n: 3, h: 'Google Alerts', p: 'Catches newspapers & trackers a job board misses. Paste this query, deliver “At most once a day”:',
    query: 'lecturer (CSE OR "computer science") Bangladesh', links: [['Open Google Alerts', 'https://www.google.com/alerts']] },
];

// Recurring requirements across circulars.
const BAR = [
  ['CGPA ≥ 3.50', 'The standard floor at both B.Sc. and M.Sc. (UIU, BUBT, SEU, Stamford, East Delta). NEUB accepted 3.25; top boards say “excellent record.”'],
  ['SSC/HSC ≥ 4.00', 'Most circulars want GPA 4.00+ at both; BUBT asks 4.50.'],
  ['M.Sc. + papers', 'A Master’s and one publication move you from “eligible” to “shortlisted.” Fresh B.Sc. graduates still get hired on CGPA + thesis + referees.'],
  ['0 yrs OK at Lecturer', 'Fresh graduates enter at Lecturer grade. Senior Lecturer ≈ 2 yrs + a paper; Assistant Professor ≈ 3 yrs + ~3 publications.'],
  ['2 hiring cycles/yr', 'Clusters before semesters: ~May–Aug for Fall, Oct–Jan for Spring. Missing a circular usually means a ~6-month wait.'],
];

const DOC_KIT = [
  'CV as PDF — teaching/research highlights up top',
  'Cover letter template, re-tailorable per university in 15 min',
  'Teaching statement / SOP (BRACU & NSU ask for it)',
  'Scanned certificates + transcripts, SSC→B.Sc., as one PDF',
  'Publication list + thesis abstract ready to attach',
  '2–3 referees with emails — thesis supervisor first',
  'Passport photos + NID scan (hard-copy boards want them)',
];

export default function NoticeBoard() {
  const [store, setStore] = useLocalStorage('cse-lecturer-board-v1', { unis: {}, checks: {} });
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const q = document.getElementById('q');
        if (q && document.activeElement !== q) { e.preventDefault(); q.focus(); }
      }
      if (e.key === 'Escape') {
        const q = document.getElementById('q');
        if (q && document.activeElement === q) { setSearch(''); q.blur(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const togglePin = useCallback((id) => {
    setStore((s) => ({
      ...s,
      unis: { ...s.unis, [id]: { ...s.unis[id], pinned: !s.unis?.[id]?.pinned } },
    }));
  }, [setStore]);

  const setStatus = useCallback((id, status) => {
    setStore((s) => ({
      ...s,
      unis: { ...s.unis, [id]: { ...s.unis[id], status } },
    }));
  }, [setStore]);

  const toggleCheck = useCallback((i) => {
    setStore((s) => ({ ...s, checks: { ...s.checks, [i]: !s.checks?.[i] } }));
  }, [setStore]);

  // Filtering
  const filtered = useMemo(() => {
    let list = [...UNIS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((u) =>
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.copy.toLowerCase().includes(q)
      );
    }
    if (regionFilter) list = list.filter((u) => u.region === regionFilter);
    if (stateFilter) list = list.filter((u) => u.state === stateFilter);
    return list;
  }, [search, regionFilter, stateFilter]);

  // Sort: pinned first, then open (by deadline), then reported, rolling, watch
  const sorted = useMemo(() => {
    const order = { open: 0, reported: 1, rolling: 2, watch: 3 };
    return [...filtered].sort((a, b) => {
      const pa = store.unis?.[a.id]?.pinned ? 0 : 1;
      const pb = store.unis?.[b.id]?.pinned ? 0 : 1;
      if (pa !== pb) return pa - pb;
      const sa = order[a.state] ?? 4;
      const sb = order[b.state] ?? 4;
      if (sa !== sb) return sa - sb;
      if (a.deadline && b.deadline) return new Date(a.deadline) - new Date(b.deadline);
      if (a.deadline) return -1;
      if (b.deadline) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [filtered, store]);

  // Closing soon rail
  const closingSoon = useMemo(() => {
    return UNIS.filter((u) => {
      const dl = daysLeft(u.deadline);
      return dl !== null && dl >= 0 && dl <= 14;
    }).sort((a, b) => daysLeft(a.deadline) - daysLeft(b.deadline));
  }, []);

  // Region options
  const regionOptions = useMemo(() => {
    const counts = {};
    UNIS.forEach((u) => { counts[u.region] = (counts[u.region] || 0) + 1; });
    return [
      { value: '', label: 'All Regions' },
      ...Object.entries(REGION_LABEL).map(([k, v]) => ({ value: k, label: v, count: counts[k] || 0 })),
    ];
  }, []);

  const stateOptions = [
    { value: '', label: 'All States' },
    { value: 'open', label: '🟢 Open' },
    { value: 'reported', label: '🟡 Reported' },
    { value: 'rolling', label: '🔵 Rolling' },
    { value: 'watch', label: '⚪ Watch' },
  ];

  // Group by region
  const grouped = useMemo(() => {
    const groups = {};
    sorted.forEach((u) => {
      if (!groups[u.region]) groups[u.region] = [];
      groups[u.region].push(u);
    });
    return groups;
  }, [sorted]);

  return (
    <>
      {/* Masthead */}
      <header className="relative overflow-hidden py-12 pb-8 border-b border-base-300">
        <div className="masthead-gradient" />
        <div className="relative z-10 max-w-5xl mx-auto px-5">
          <p className="text-xs tracking-[.16em] uppercase font-bold text-primary">
            CSE Lecturer Notice Board
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-3 tracking-tight">
            Every CSE Lecturer opening at BD's private universities — in one place
          </h1>
          <p className="text-base-content/60 max-w-2xl text-sm leading-relaxed">
            {UNIS.length} universities across Chattogram, Dhaka &amp; Sylhet. Curated circulars, deadlines,
            application steps and a live auto-feed.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 mt-4 text-xs text-base-content/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Data verified {VERIFIED}
            </span>
            <span>·</span>
            <span>{UNIS.filter((u) => u.state === 'open').length} open</span>
            <span>·</span>
            <span>{UNIS.filter((u) => u.state === 'rolling').length} rolling</span>
          </div>
        </div>
        {/* Accent bar */}
        <div className="absolute bottom-0 left-0 w-48 h-[3px] bg-gradient-to-r from-primary to-primary/20 rounded" />
      </header>

      <div className="max-w-5xl mx-auto px-5">
        {/* Live feed */}
        <LiveFeed />

        {/* Closing soon rail */}
        {closingSoon.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-serif font-bold mb-3 text-error">⏰ Closing Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {closingSoon.map((u) => (
                <div key={u.id} className="card bg-base-200 border border-error/30 border-l-4 border-l-error shadow-sm card-glow">
                  <div className="card-body p-4 gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-base font-semibold pr-16">{u.name}</h3>
                      <div className="badge badge-error badge-sm font-mono whitespace-nowrap">
                        {daysLeft(u.deadline)}d left
                      </div>
                    </div>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: u.copy }} />
                    <a href={u.links?.[0]?.[1]} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-1">
                      Apply now ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Toolbar */}
        <div className="sticky top-16 z-20 bg-base-100/80 backdrop-blur-xl border-b border-base-300 py-3 -mx-5 px-5 mt-8 flex flex-wrap gap-2.5 items-center">
          <SearchBar value={search} onChange={setSearch} />
          <FilterChips options={regionOptions} active={regionFilter} onToggle={(v) => setRegionFilter(regionFilter === v ? '' : v)} />
          <FilterChips options={stateOptions} active={stateFilter} onToggle={(v) => setStateFilter(stateFilter === v ? '' : v)} />
          <span className="text-xs text-base-content/50 ml-auto whitespace-nowrap">
            <strong className="text-base-content">{filtered.length}</strong> / {UNIS.length}
          </span>
        </div>

        {/* University cards */}
        {Object.entries(grouped).length === 0 ? (
          <p className="text-sm italic text-base-content/50 py-8">No universities match your filters.</p>
        ) : (
          Object.entries(grouped).map(([region, unis]) => (
            <section key={region} className="mt-8">
              <div className="flex items-baseline gap-3 border-b border-base-300 pb-2 mb-4">
                <h2 className="text-xl font-serif font-bold">{REGION_LABEL[region] || region}</h2>
                <span className="text-xs text-base-content/50">{unis.length} universities</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unis.map((u) => (
                  <UniCard
                    key={u.id}
                    uni={u}
                    pinned={!!store.unis?.[u.id]?.pinned}
                    onTogglePin={togglePin}
                    status={store.unis?.[u.id]?.status || ''}
                    onStatusChange={setStatus}
                  />
                ))}
              </div>
            </section>
          ))
        )}

        {/* Salary section */}
        {SALARY_TIERS && (
          <section className="mt-12">
            <h2 className="text-xl font-serif font-bold mb-4">💰 Salary Cheat Sheet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SALARY_TIERS.map((tier, i) => (
                <div key={i} className="card bg-base-200 border border-base-300 border-t-4 border-t-primary shadow-sm card-glow">
                  <div className="card-body p-4">
                    <p className="text-[10px] uppercase tracking-[.08em] font-semibold text-base-content/40">{tier.name}</p>
                    <p className="text-2xl font-serif font-bold text-primary font-mono">
                      {tier.range} <span className="text-xs font-sans font-normal text-base-content/40">/mo entry</span>
                    </p>
                    <p className="text-[11px] font-mono text-base-content/50 leading-snug mb-1">{tier.sub}</p>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: tier.note }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Portals */}
        {PORTALS && (
          <section className="mt-12">
            <h2 className="text-xl font-serif font-bold mb-4">🔗 Quick Portal Links</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {PORTALS.map(([name, url, note], i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  className="flex justify-between items-baseline gap-2 p-3 bg-base-200 border border-base-300 rounded-xl text-sm font-semibold hover:border-primary hover:-translate-y-0.5 transition-all">
                  {name}
                  <span className="text-[10px] font-mono text-base-content/40">{note}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Auto-alerts */}
        <section className="mt-12">
          <h2 className="text-xl font-serif font-bold mb-1">🔔 Never miss a new circular — set these once</h2>
          <p className="text-sm text-base-content/60 mb-4">They watch Bdjobs, LinkedIn &amp; the news for “Lecturer CSE” and email you — ~5 min, then it runs itself.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ALERTS.map((a) => (
              <div key={a.n} className="card bg-base-200 border border-base-300 border-t-4 border-t-primary shadow-sm">
                <div className="card-body p-4 gap-2">
                  <h3 className="font-serif text-sm font-semibold">{a.n}. {a.h}</h3>
                  <p className="text-xs">{a.p}</p>
                  {a.query && <code className="text-[11px] bg-base-100 border border-base-300 rounded px-2 py-1 block break-all">{a.query}</code>}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {a.links.map(([l, u]) => (
                      <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xs">{l} ↗</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The bar + paperwork */}
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-serif font-bold mb-4">🎯 The bar — what circulars keep asking</h2>
            <div className="grid gap-2">
              {BAR.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[128px_1fr] gap-3 items-baseline p-3 bg-base-200 border border-base-300 rounded-lg">
                  <b className="font-mono text-xs text-primary">{k}</b>
                  <span className="text-xs">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold mb-4">📋 Document kit</h2>
            <div className="card bg-base-200 border border-base-300 shadow-sm">
              <div className="card-body p-4">
                <ul className="grid gap-2">
                  {DOC_KIT.map((item, i) => {
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
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-base-300 pt-4 pb-8 text-xs text-base-content/40 max-w-prose leading-relaxed">
          Hand-curated by a CSE applicant · data last verified {VERIFIED} · built with React, Tailwind &amp; daisyUI ·
          <a href="https://github.com/DBP625/cse-lecturer-board-react" className="link link-primary ml-1">source ↗</a>
        </footer>
      </div>
    </>
  );
}
