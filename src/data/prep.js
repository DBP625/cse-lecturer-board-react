// 14-day prep roadmap data, ported from the original build. Drive folder IDs kept.
const F = 'https://drive.google.com/drive/folders/';
export const DRIVE = F;

export const ASSETS = [
  { h: 'Your CUET previous-year questions', p: 'Every semester folder carries a <strong>Questions</strong> folder — 19-batch and 20-batch term finals included. The closest thing to a private-uni written-test bank that exists.',
    links: [['2-1 Questions', '1Fd_rf5cwteUm2NPogntrhS1DqBRVDnVo'], ['2-2', '1H28sJjLwAAZjYnT7LBCgHh-zqvD-5Gnc'], ['3-1', '1oy-Sr8Iks5TnmjmjrDfhxtLu1uMYWmsD'], ['3-2', '1NRxSO8Fok_t4Ks5VedZqzinX7d9aLvgt']] },
  { h: 'Jobs / C.S.E stash', p: '<strong>Compact IT Written.pdf</strong> is your BD written-format primer; the S.W.E. interview Q&amp;A doubles as viva prep for systems questions.',
    links: [['Open Jobs/C.S.E', '1avh_7lkwLwPvB3LayaQgN4iSElmMqhHo']] },
  { h: 'CV format, dept-approved', p: 'The <strong>CV Format (Provath sir)</strong> folder in 4-2 is the layout your own department endorses — start the paper-screen file from it.',
    links: [['Open CV Format', '1mR2P6t3Q5pOApilhIcfoczh7c9LNulyt']] },
  { h: 'M.Sc. folder — the parallel track', p: 'You collected CUET PG circulars for the July-2024 and July-2025 sessions. The <strong>July-2026 cycle is due about now</strong> — the Assistant-Professor ladder needs the M.Sc.',
    links: [['Open M.S.C', '1Npjen6LmeGxnKCxKRFCbKskFlpMsUlDj']] },
  { h: 'One outside supplement', p: 'GATE CS previous questions, sorted by subject with solutions — for MCQ volume your term finals don’t provide. Free.',
    links: [['gateoverflow.in', 'https://gateoverflow.in']], external: true },
];

// [name, cgpaMin, sscMin, hscMin, note]  null = no stated floor
export const FLOORS = [
  ['UIU', 3.50, null, null, 'stated hard filter'],
  ['BUBT', 3.50, 4.50, 4.50, ''],
  ['Southeast', 3.50, 4.00, 4.00, ''],
  ['Stamford', 3.50, 4.00, 4.00, ''],
  ['East Delta', 3.50, 4.00, 4.00, ''],
  ['Metropolitan', 3.50, null, null, ''],
  ['Southern', 3.50, 4.00, 4.00, 'or First Class'],
  ['NEUB', 3.25, 4.00, 4.00, ''],
  ['Eastern', 3.00, null, null, '“3 First Classes” rule'],
  ['Green', 3.00, null, null, '“3 first divisions” rule'],
  ['BRAC', null, null, null, 'no stated floor — whole record'],
  ['NSU', null, null, null, 'no stated floor'],
  ['IUB', null, null, null, 'no stated floor'],
  ['East West', null, null, null, 'no stated floor'],
  ['AIUB', null, null, null, 'no stated floor'],
  ['IIUC', null, null, null, 'no stated floor'],
  ['AUST', null, null, null, 'no stated floor'],
  ['Daffodil', null, null, null, 'no stated floor'],
  ['UAP', null, null, null, 'no stated floor'],
  ['Premier', null, null, null, 'no stated floor'],
];

// Drill rows. rest rows use {rest, full, pm}; study rows use {day, subj, code, links, tail, pm}.
export const DRILL = [
  { day: '1', subj: 'Data Structures', code: 'CSE-241', links: [['2-1 Questions', '1Fd_rf5cwteUm2NPogntrhS1DqBRVDnVo']], tail: ' + 25 GATE MCQs', pm: 'Arrays vs linked lists · stacks/queues · BST ops' },
  { day: '2', subj: 'Algorithms', code: 'CSE-243', links: [['2-2 Questions', '1H28sJjLwAAZjYnT7LBCgHh-zqvD-5Gnc']], tail: ' + GATE', pm: 'Big-O · sorting table · greedy vs DP in one page' },
  { day: '3', subj: 'DBMS', code: 'CSE-251', links: [['2-2 Questions', '1H28sJjLwAAZjYnT7LBCgHh-zqvD-5Gnc']], tail: ' + GATE', pm: 'Normalization 1NF→BCNF with one worked schema · SQL joins' },
  { day: '4', subj: 'Operating Systems', code: 'CSE-335', links: [['3-1 Questions', '1oy-Sr8Iks5TnmjmjrDfhxtLu1uMYWmsD']], tail: ' + GATE', pm: 'Process vs thread · scheduling · deadlock conditions' },
  { day: '5', subj: 'Networks', code: 'CSE-311/313', links: [['3-2 Questions', '1NRxSO8Fok_t4Ks5VedZqzinX7d9aLvgt']], tail: ' + GATE', pm: 'OSI vs TCP/IP · handshake · subnetting drill' },
  { day: '6', subj: 'C / OOP', code: 'CSE-141/143', links: [['1-2 Questions', '1cstnmmGBHOx9f4bRc77EnZYvxR15ZO0A']], tail: ' — write code on paper', pm: 'Pointers · recursion trace · 4 OOP pillars with code' },
  { day: '7', rest: true, full: 'Mock written #1 — 60 min, closed book: 5 questions self-set from days 1–6', pm: '+ English: one paragraph (“Role of ICT in education”)' },
  { day: '8', subj: 'Discrete Math', code: 'CSE-111', links: [['1-2 Questions', '1cstnmmGBHOx9f4bRc77EnZYvxR15ZO0A']], tail: ' + GATE', pm: 'Sets/relations · graph basics · induction template' },
  { day: '9', subj: 'Digital Logic', code: 'CSE-221', links: [['2-1 Questions', '1Fd_rf5cwteUm2NPogntrhS1DqBRVDnVo']], tail: ' + GATE', pm: 'K-map · flip-flops · adder design' },
  { day: '10', subj: 'Theory of Computing', code: 'CSE-331', links: [['3-1 Questions', '1oy-Sr8Iks5TnmjmjrDfhxtLu1uMYWmsD']], tail: '', pm: 'DFA/NFA · CFG · decidability one-pager' },
  { day: '11', subj: 'AI + ML', code: 'CSE-345/445', links: [['3-2', '1NRxSO8Fok_t4Ks5VedZqzinX7d9aLvgt'], ['4-1 Questions', '1KXovGyaJT0_R6njDAMKxvaLZfyFn2A_P']], tail: '', pm: 'Search · overfitting · a worked applied example' },
  { day: '12', subj: 'English + format', code: '', links: [], tail: 'Compact IT Written.pdf English section', pm: 'Grammar drill · translation · formal application letter' },
  { day: '13', rest: true, full: 'Mock written #2 — full format: 40 marks subject + 20 English, 90 min', pm: 'Mark it yourself against your notes' },
  { day: '14', rest: true, full: 'Demo-class dress rehearsal — full 15-min run, recorded, in front of at least one human', pm: 'Watch the recording; fix the top 2 flaws' },
];

export const DEMO = [
  { h: 'Recursion, traced live', src: 'from CSE-141/241', p: 'Factorial → call-stack drawing → one pitfall (missing base case). Marker-only, crowd-pleaser, impossible to bluff — panels love it.' },
  { h: 'Normalization to 3NF', src: 'from CSE-251', p: 'One messy student-course table on the board, decomposed step by step. Shows database teaching chops — the single most-taught CSE service course.' },
  { h: 'TCP 3-way handshake', src: 'from CSE-311', p: 'Sequence diagram + a “what if SYN is lost?” question to the room. Gives the panel a natural interruption point — which you’ll be ready for.' },
];

export const REHEARSAL = [
  'Teach sheet written for all 3 topics (from the drill’s PM work)',
  'Each topic once alone at a wall/whiteboard, timed ≤ 12 min',
  'One full run recorded on phone — watched, two fixes noted',
  'One run in front of juniors/friends with a planted interruption',
  'English-only delivery verified — no Bangla fallback mid-example',
  'Opening 30 seconds memorized word-for-word (hook + roadmap of the mini-lecture)',
];

export const VIVA_PITCH = 'Summarize your final-year research in four beats — the problem it tackled, your approach, one headline result, and where you’d take it next. Memorize the spine, not a script, keep it near two minutes, then stop and let them ask.';

export const VIVA_COURSES = {
  hot: ['Structured Programming', 'OOP', 'Data Structures', 'Algorithms', 'DBMS', 'AI / ML'],
  rest: ['Operating Systems', 'Networks', 'Discrete Math', 'Theory of Computing', 'DLD', '+ every sessional/lab'],
};

export const VIVA_QS = [
  ['Why teaching over industry?', 'Answer with evidence from your own choices — the projects you picked and why.'],
  ['Research plan?', 'Describe how you’d extend your own research direction; name a venue you’d target.'],
  ['M.Sc. plans?', '“Enrolling part-time at CUET in the coming session” — you have the circulars; boards want the ladder plan.'],
  ['Salary expectation?', 'Name your tier’s band from the notice board — upper half if your CGPA + a publication back it.'],
  ['Availability?', 'Immediate — a fresh graduate with no notice period is a genuine advantage over employed candidates.'],
];

export const BEFORE_CALL = [
  'Thesis paper submitted to a venue — “under review” transforms the publication answer.',
  'Google Scholar + ORCID live, LinkedIn current.',
  'Supervisor (and one more faculty referee) warned by email that calls may come.',
  'Hard-copy file assembled — certificates SSC→B.Sc., NID, photos, publication reprint.',
  'One printed copy of the demo-class teach sheets riding in the same folder.',
];
