// Exact study-topic checklist, ported from the original notice-board build.
// Each subject → named groups → atomic topics: [text, star(0/1/2), optionalExamQ].
//   star 2 = ★★ CORE (near-guaranteed) · 1 = ★ KEY (high-frequency) · 0 = round-out.
export const SUBJECTS = [
  { id: 'ds', name: 'Data Structures', code: 'CSE-241', sem: '2-1', tier: 1, groups: [
    { g: 'Foundations', t: [
      ['Complexity: best / average / worst case; Big-O, Ω, Θ notation', 2, 'Give the time complexity of an operation and justify it'],
      ['Abstract Data Type (ADT) — concept vs implementation', 1],
    ] },
    { g: 'Linear structures', t: [
      ['Arrays — 1D/2D, row- vs column-major address calculation', 1, 'Find address of A[i][j] given base address'],
      ['Linked list — singly, doubly, circular: insert / delete / traverse', 2, 'Write insert-at-position for a singly linked list'],
      ['Stack — push/pop; applications: infix→postfix, balanced parentheses', 2, 'Convert an infix expression to postfix using a stack'],
      ['Queue — linear, circular, priority queue, deque', 2, 'Why a circular queue over a linear one'],
    ] },
    { g: 'Trees & hierarchical', t: [
      ['Tree terminology + binary tree traversals: pre / in / post / level order', 2, 'Give the 3 traversals of a given tree'],
      ['Binary Search Tree — insert, delete, search + their complexity', 2, 'Insert a sequence into a BST and delete a node with 2 children'],
      ['Heap — min/max heap, heapify, heap sort', 2, 'Build a max-heap from an array; show heap sort steps'],
      ['Balanced trees — AVL rotations, B-tree / B+ tree (concept)', 1],
    ] },
    { g: 'Hashing & graphs', t: [
      ['Hashing — hash functions, collision resolution (chaining, open addressing)', 2, 'Insert keys with linear probing / chaining'],
      ['Graph representation — adjacency matrix vs adjacency list', 1],
      ['Graph traversal — BFS & DFS (also in Algorithms)', 1],
    ] },
  ] },
  { id: 'algo', name: 'Algorithms', code: 'CSE-243', sem: '2-2', tier: 1, groups: [
    { g: 'Analysis', t: [
      ['Asymptotic notation & growth of functions — order them', 2, 'Rank functions by growth rate'],
      ['Recurrence relations — substitution, recursion tree, Master theorem', 2, 'Solve T(n)=2T(n/2)+n by the Master theorem'],
    ] },
    { g: 'Design paradigms', t: [
      ['Divide & conquer — merge sort, quick sort, binary search + complexity', 2, "Derive merge sort's O(n log n)"],
      ['Greedy — activity selection, fractional knapsack, job sequencing, Huffman', 2, 'Solve fractional knapsack greedily'],
      ['Dynamic programming — 0/1 knapsack, LCS, matrix-chain, coin change', 2, 'Fill the DP table for 0/1 knapsack'],
      ['Backtracking — N-Queens, subset/permutation generation', 1],
    ] },
    { g: 'Graph algorithms', t: [
      ['BFS / DFS + applications (cycle detect, connected components)', 2],
      ['Shortest path — Dijkstra, Bellman-Ford, Floyd-Warshall', 2, 'Trace Dijkstra from a source node'],
      ['Minimum spanning tree — Kruskal, Prim, Union-Find', 2, 'Build the MST of a weighted graph'],
      ['Topological sort (DAG)', 1],
    ] },
    { g: 'Complexity classes', t: [
      ['P, NP, NP-complete, NP-hard — definitions & relationship', 1, 'Difference between NP-complete and NP-hard'],
    ] },
  ] },
  { id: 'dbms', name: 'Database Management Systems', code: 'CSE-251', sem: '2-2', tier: 1, groups: [
    { g: 'Data modeling', t: [
      ['DBMS vs file system; three-schema architecture; DBA role', 1],
      ['ER model — entities, attributes, relationships, cardinality, keys', 2, 'Draw an ER diagram for a given scenario'],
      ['Extended ER — generalization, specialization, aggregation', 1],
      ['ER → relational schema mapping', 2, 'Map a given ER diagram to tables'],
    ] },
    { g: 'Relational model & SQL', t: [
      ['Keys — super, candidate, primary, foreign', 2],
      ['Relational algebra — select, project, join, union, division', 1],
      ['SQL — joins, nested queries, aggregates, GROUP BY / HAVING', 2, 'Write a SQL query with a join + GROUP BY'],
    ] },
    { g: 'Design theory (highest weight)', t: [
      ["Functional dependencies + Armstrong's axioms", 2, 'Find the candidate keys from a set of FDs'],
      ['Normalization — 1NF, 2NF, 3NF, BCNF, 4NF', 2, 'Normalize a table up to BCNF, step by step'],
    ] },
    { g: 'Transactions & storage', t: [
      ['Transactions & ACID properties', 2, 'Explain each ACID property with an example'],
      ['Concurrency — schedules, serializability, locking (2PL)', 1],
      ['Indexing — B+ tree, hashing', 1],
    ] },
  ] },
  { id: 'os', name: 'Operating Systems', code: 'CSE-335', sem: '3-1', tier: 1, groups: [
    { g: 'Processes & scheduling', t: [
      ['OS types & functions; kernel vs user mode', 1],
      ['Process vs thread; PCB; process states diagram', 2, 'Difference between process and thread'],
      ['CPU scheduling — FCFS, SJF, SRTF, Round Robin, Priority', 2, 'Compute avg waiting & turnaround time for given processes'],
    ] },
    { g: 'Synchronization', t: [
      ['Race condition & critical-section problem', 2],
      ['Semaphores & mutex — producer-consumer, reader-writer', 1, 'Solve producer-consumer with semaphores'],
      ["Deadlock — 4 necessary conditions, prevention, avoidance, Banker's algorithm", 2, "Apply the Banker's algorithm to a given state"],
    ] },
    { g: 'Memory management', t: [
      ['Paging & segmentation; logical vs physical address', 2, 'Translate a logical address under paging'],
      ['Virtual memory + page replacement — FIFO, LRU, Optimal', 2, 'Count page faults for a reference string under LRU'],
      ['Thrashing & locality', 1],
    ] },
    { g: 'Storage', t: [
      ['Disk scheduling — FCFS, SSTF, SCAN, C-SCAN', 1, 'Compute head movement for SCAN'],
      ['File systems & allocation methods', 0],
    ] },
  ] },
  { id: 'cn', name: 'Computer Networks', code: 'CSE-311', sem: '3-2', tier: 1, groups: [
    { g: 'Reference models', t: [
      ['OSI 7 layers vs TCP/IP — the function of each layer', 2, 'Name each OSI layer and one job it does'],
    ] },
    { g: 'Network layer', t: [
      ['IPv4 addressing — classes, private ranges, CIDR notation', 2],
      ['Subnetting — calculate subnets, hosts, subnet mask', 2, 'Given a network + prefix, find #subnets and #hosts'],
      ['Routing — distance vector vs link state; RIP, OSPF', 1],
    ] },
    { g: 'Transport & application', t: [
      ['TCP vs UDP — when to use which', 2],
      ['TCP 3-way handshake; flow & congestion control', 2, 'Draw the 3-way handshake; what if a SYN is lost'],
      ['Application protocols — DNS, HTTP, DHCP, SMTP (concept)', 1],
    ] },
    { g: 'Data link / access', t: [
      ['MAC, Ethernet, CSMA/CD', 1],
      ['Error/flow control — stop-and-wait, sliding window (also Data Com)', 1],
    ] },
  ] },
  { id: 'oop', name: 'Object-Oriented Programming (C++)', code: 'CSE-143', sem: '1-2', tier: 1, groups: [
    { g: 'Fundamentals', t: [
      ['Procedural vs OOP; classes & objects', 2],
      ['Encapsulation & data hiding; access specifiers (public/private/protected)', 2],
    ] },
    { g: 'Core mechanisms', t: [
      ['Constructors & destructors — default, parameterized, copy', 2, 'Difference between copy constructor and assignment'],
      ['Inheritance — single, multiple, multilevel, hierarchical, hybrid', 2, 'Explain the diamond problem'],
      ['Polymorphism — compile-time (overloading) vs runtime (virtual/overriding)', 2, 'Overloading vs overriding, with example'],
      ['Operator overloading', 1],
    ] },
    { g: 'Advanced', t: [
      ['Abstract class & pure virtual function', 1],
      ['Templates — function & class templates', 0],
      ['Exception handling — try / catch / throw', 0],
      ['File handling & stream I/O', 0],
    ] },
  ] },
  { id: 'prog', name: 'Structured Programming (C)', code: 'CSE-141', sem: '1-1', tier: 2, groups: [
    { g: 'Core', t: [
      ['Data types, operators, control structures (if/switch/loops)', 1],
      ['Functions — call by value vs reference; scope & storage classes', 1],
      ['Recursion — trace output & write recursive functions', 2, 'Trace factorial/Fibonacci recursion + the call stack'],
      ['Pointers — arithmetic, pointer to array, pointer to function', 2, 'What does *(arr+i) evaluate to and why'],
    ] },
    { g: 'Data & memory', t: [
      ['Arrays & strings', 1],
      ['Structures & unions', 1],
      ['Dynamic memory — malloc / calloc / free', 1],
      ['File handling in C', 0],
    ] },
  ] },
  { id: 'discrete', name: 'Discrete Mathematics', code: 'CSE-111', sem: '1-2', tier: 2, groups: [
    { g: 'Logic & sets', t: [
      ['Propositional & predicate logic; truth tables; logical equivalence', 2, 'Prove two propositions are equivalent'],
      ['Set theory; relations & functions; equivalence relations', 2],
    ] },
    { g: 'Proof & counting', t: [
      ['Proof techniques — induction, contradiction, contrapositive', 2, 'Prove a summation formula by induction'],
      ['Combinatorics — permutation, combination, pigeonhole principle', 1],
    ] },
    { g: 'Structures', t: [
      ['Graph theory — paths, cycles, trees, Euler & Hamiltonian', 1],
      ['Recurrence relations — solving', 1],
      ['Boolean algebra (bridges to DLD)', 0],
    ] },
  ] },
  { id: 'dld', name: 'Digital Logic Design', code: 'CSE-221', sem: '2-1', tier: 2, groups: [
    { g: 'Number & Boolean', t: [
      ["Number systems & conversion; 1's & 2's complement", 2, "Convert & do 2's-complement subtraction"],
      ["Boolean algebra, laws, De Morgan's theorems", 2],
      ['Logic gates; universal gates (NAND/NOR)', 1, 'Implement any gate using only NAND'],
    ] },
    { g: 'Combinational', t: [
      ["K-map simplification — 2/3/4 variable, SOP & POS, don't-cares", 2, 'Minimize a 4-variable function with a K-map'],
      ['Adders (half/full), subtractor', 1],
      ['Multiplexer, demultiplexer, encoder, decoder', 1],
    ] },
    { g: 'Sequential', t: [
      ['Flip-flops — SR, JK, D, T; excitation tables', 2, 'Convert a JK flip-flop to a D flip-flop'],
      ['Counters & registers (sync vs async)', 1],
    ] },
  ] },
  { id: 'toc', name: 'Theory of Computing', code: 'CSE-331', sem: '3-1', tier: 2, groups: [
    { g: 'Regular languages', t: [
      ['Finite automata — DFA & NFA; NFA→DFA conversion', 2, 'Design a DFA for a given language'],
      ['Regular expressions & regular languages', 2],
      ['Pumping lemma for regular languages', 1, 'Prove a language is not regular'],
    ] },
    { g: 'Context-free & beyond', t: [
      ['Context-free grammar — derivations, parse trees, ambiguity', 2, 'Write a CFG for a given language'],
      ['Pushdown automata (concept)', 1],
      ['Turing machine (concept); Church-Turing thesis', 1],
      ['Decidability & the halting problem (concept)', 0],
    ] },
  ] },
  { id: 'ca', name: 'Computer Architecture', code: 'CSE-321', sem: '3-2', tier: 2, groups: [
    { g: 'CPU & instructions', t: [
      ['Von Neumann architecture; instruction cycle (fetch-decode-execute)', 2],
      ['Instruction formats & addressing modes', 2, 'Identify the addressing mode of given instructions'],
      ['ALU, registers, control unit (hardwired vs microprogrammed)', 1],
    ] },
    { g: 'Performance & memory', t: [
      ['Pipelining — stages, hazards (data/control/structural), speedup', 2, 'Compute pipeline speedup / spot a hazard'],
      ['Cache — mapping (direct, associative, set-associative); hit/miss', 2, 'Compute the hit ratio; map an address to a cache line'],
      ['Memory hierarchy & locality of reference', 1],
    ] },
    { g: 'I/O', t: [
      ['I/O techniques — programmed, interrupt-driven, DMA', 1],
    ] },
  ] },
  { id: 'swe', name: 'Software Engineering', code: 'CSE-355', sem: '3-2', tier: 2, groups: [
    { g: 'Process', t: [
      ['SDLC + process models — waterfall, iterative, spiral, agile/scrum', 2, 'Compare waterfall vs agile; when to use each'],
      ['Requirements engineering; SRS; functional vs non-functional', 2],
    ] },
    { g: 'Design & quality', t: [
      ['Design concepts — cohesion & coupling, modularity', 2, 'Types of cohesion and coupling'],
      ['Testing — unit/integration/system; black-box vs white-box', 2, 'Difference between verification and validation'],
      ['UML — use-case, class, sequence diagrams', 1],
    ] },
    { g: 'Management', t: [
      ['Estimation — COCOMO, function points (concept)', 1],
      ['Risk management; SQA; SCM', 0],
    ] },
  ] },
  { id: 'datacom', name: 'Data Communication', code: 'CSE-313', sem: '3-1', tier: 3, groups: [
    { g: 'Core', t: [
      ['Error detection — parity, checksum, CRC, Hamming code', 2, 'Compute the CRC / Hamming code for given bits'],
      ['Signals, bandwidth, Nyquist & Shannon capacity', 1, 'Find max data rate by Nyquist/Shannon'],
      ['Encoding & modulation — line coding, ASK/FSK/PSK', 1],
      ['Flow/error control — stop-and-wait, Go-Back-N, selective repeat', 1],
      ['Multiplexing (FDM/TDM) & switching (circuit vs packet)', 1],
    ] },
  ] },
  { id: 'sad', name: 'System Analysis & Design', code: 'CSE-353', sem: '3-1', tier: 3, groups: [
    { g: 'Core', t: [
      ['SDLC phases; feasibility study (TELOS)', 1],
      ['Data Flow Diagram — level 0/1/2, rules', 2, 'Draw a level-1 DFD for a small system'],
      ['ER modeling & data dictionary (overlaps DBMS)', 1],
      ['UML use-case & the design phase', 1],
      ['Requirement gathering techniques', 0],
    ] },
  ] },
  { id: 'mpi', name: 'Microprocessors & Interfacing', code: 'CSE-333', sem: '3-1', tier: 3, groups: [
    { g: 'Core', t: [
      ['8086 architecture — registers, segments, flags', 2, 'Explain the flag register bits'],
      ['Addressing modes of 8086', 2],
      ['Assembly instructions & simple programs', 1],
      ['Interrupts (hardware/software); interrupt vector table', 1],
      ['Interfacing — 8255 PPI, memory interfacing', 1],
    ] },
  ] },
  { id: 'ai', name: 'Artificial Intelligence', code: 'CSE-345', sem: '3-2', tier: 3, groups: [
    { g: 'Search', t: [
      ['Uninformed search — BFS, DFS, uniform-cost, iterative deepening', 2],
      ['Informed search — greedy best-first, A* (heuristics, admissibility)', 2, 'Trace A* on a graph; is a heuristic admissible?'],
      ['Adversarial search — minimax, alpha-beta pruning', 2, 'Apply alpha-beta to a game tree'],
    ] },
    { g: 'Knowledge & learning', t: [
      ['Agents & environment types (PEAS)', 1],
      ['Logic & knowledge representation — propositional, predicate, resolution', 1],
      ['Intro to ML / expert systems; how modern AI extends classical approaches', 1],
    ] },
  ] },
  { id: 'ml', name: 'Machine Learning', code: 'CSE-445', sem: '4-1', tier: 3, groups: [
    { g: 'Paradigms & models', t: [
      ['Supervised vs unsupervised vs reinforcement learning', 2],
      ['Regression — linear & logistic; cost function; gradient descent', 2],
      ['Classification — KNN, decision tree, Naive Bayes, SVM', 2, 'How a decision tree splits (entropy / information gain)'],
      ['Clustering — K-means', 1],
    ] },
    { g: 'Model evaluation & tuning', t: [
      ['Overfitting vs underfitting; bias-variance; regularization', 2, 'How you detect and fix overfitting'],
      ['Evaluation — accuracy, precision, recall, F1, confusion matrix', 2, 'Compute precision/recall from a confusion matrix'],
      ['Neural networks & backpropagation (intro); train/val/test split', 1],
    ] },
  ] },
  { id: 'compiler', name: 'Compiler Design', code: 'CSE-431', sem: '4-2', tier: 3, groups: [
    { g: 'Core', t: [
      ['Phases of a compiler (the full pipeline)', 2, 'Name the 6 phases in order with what each does'],
      ['Lexical analysis — tokens, regex, role of DFA (links to TOC)', 2],
      ['Parsing — top-down (LL(1)) vs bottom-up (LR); FIRST/FOLLOW', 2, 'Compute FIRST and FOLLOW sets for a grammar'],
      ['Syntax-directed translation & intermediate code', 1],
      ['Code optimization & symbol table', 0],
    ] },
  ] },
];

// Standard BD-used textbook + per-group chapter map. "✓" = confirmed in the CUET drive.
export const REF = {
  ds: { book: "Lipschutz — Data Structures (Schaum's); Tenenbaum — Data Structures Using C", drive: '✓ “Lecture Notes Data Structures CSC-214.pdf” is the primary; Books folder for depth', g: ["Schaum's Ch 1–2", 'Ch 3–4 (lists, stacks, queues)', 'Ch 6–7 (trees, heaps)', 'Ch 8–9 (hashing, graphs)'] },
  algo: { book: 'Cormen, Leiserson, Rivest & Stein — Introduction to Algorithms (CLRS)', drive: '✓ confirmed — files C-1…C-4 (Coreman) + ADA Class Note.pdf', g: ['CLRS Ch 2–4', 'Ch 4 (D&C), 15 (DP), 16 (greedy)', 'Ch 22 (BFS/DFS), 23 (MST), 24–25 (shortest paths)', 'Ch 34 (NP-completeness)'] },
  dbms: { book: 'Elmasri & Navathe — Fundamentals of Database Systems', drive: '✓ confirmed + L-1…L-14 note PDFs', g: ['Navathe Ch 3–4 (ER/EER), 9 (mapping)', 'Ch 5–7 (relational model, algebra, SQL)', 'Ch 14–15 (FD & normalization)', 'Ch 20–22 (transactions), 17 (indexing)'] },
  os: { book: 'Silberschatz, Galvin & Gagne — Operating System Concepts', drive: '“O.S. - Term Final-Q&A.pdf” + Books & Solution Books', g: ['Ch 3–5 (processes, threads, scheduling)', 'Ch 6 (synchronization), 8 (deadlock)', 'Ch 9–10 (paging, virtual memory)', 'Ch 11 (disk scheduling), 13–14 (file system)'] },
  cn: { book: 'Forouzan — Data Communications & Networking; Kurose & Ross — Top-Down Approach', drive: '✓ “Computer Network (Chapterwise)…Most Important Q” mega-PDF + sir-Mahfuz/Rashad notes', g: ['Forouzan Ch 2 (network models)', 'Ch 19 (IPv4/subnetting), 20–22 (routing)', 'Ch 23–24 (TCP/UDP) / Kurose Ch 3', 'Ch 11–12 (MAC, Ethernet)'] },
  oop: { book: 'E. Balagurusamy — Object-Oriented Programming with C++', drive: '✓ Lesson 1–36 PPTs follow Balagurusamy chapter-for-chapter', g: ['Ch 1–3 (principles) + 6 (classes & objects)', 'Ch 6 (constructors), 7 (operator overloading), 8 (inheritance), 9 (virtual/polymorphism)', 'Ch 11 (templates), 12 (exceptions), 13 (files)'] },
  prog: { book: 'E. Balagurusamy — Programming in ANSI C; Kernighan & Ritchie — The C Programming Language', drive: '“C.S.E.-141 (Question).pdf” + Books & Solution Books', g: ['Ch 3–5 (control), 9 (functions/recursion), 11 (pointers)', 'Ch 7 (arrays), 8 (strings), 10 (structures), 12 (files), 13 (dynamic memory)'] },
  discrete: { book: 'Kenneth H. Rosen — Discrete Mathematics and Its Applications', drive: 'Books folder + “Questions (20, 19, 17–07).pdf”', g: ['Rosen Ch 1 (logic), 2 (sets/functions)', 'Ch 5 (induction), 6 (counting)', 'Ch 9 (relations), 10 (graphs), 8 (recurrences)'] },
  dld: { book: 'M. Morris Mano — Digital Design', drive: '“basic logic concept/gate.pdf” + Books & Solution Books', g: ['Mano Ch 1 (number systems), 2 (Boolean algebra)', 'Ch 3–4 (K-map, combinational: adders/mux)', 'Ch 5–6 (flip-flops, counters, registers)'] },
  toc: { book: 'Hopcroft, Motwani & Ullman — Automata Theory; Sipser — Theory of Computation', drive: '✓ “T.O.C. - Term Final-Q&A.pdf” + Lectures/Notes folders', g: ['HMU Ch 2 (FA), 3 (regex), 4 (properties/pumping)', 'Ch 5 (CFG), 6 (PDA), 8 (TM), 9 (decidability)'] },
  ca: { book: 'William Stallings — Computer Organization & Architecture; Mano — Computer System Architecture', drive: '“C.A. (Chapterwise).pdf” + গুরুত্ব.docx + Notes/Slides', g: ['Stallings Ch 12–13 (instruction sets/addressing)', 'Ch 14 (pipelining), 4 (cache), 5 (memory)', 'Ch 7 (I/O, DMA)'] },
  swe: { book: "Roger Pressman — Software Engineering: A Practitioner's Approach; Ian Sommerville — Software Engineering", drive: '✓ “S.W.E. (Q&A 16-23) (Mukta Mam)” + Suggesstions.pdf', g: ['Pressman — process models & requirements', 'design concepts (cohesion/coupling) & testing chapters', 'estimation (COCOMO), risk & SQA'] },
  datacom: { book: 'Behrouz A. Forouzan — Data Communications & Networking', drive: '“Data Com. - Term Final-Q&A.pdf” + Polynomial Representation.png (CRC)', g: ['Forouzan Ch 10 (CRC/Hamming), 3–5 (signals/encoding), 11 (flow control), 6 (multiplexing), 8 (switching)'] },
  sad: { book: 'Kendall & Kendall — Systems Analysis and Design', drive: '“S.A.D. - Term Final-Q&A.pdf” + Worked Examples / Suggestions folders', g: ['Kendall — SDLC, DFD, ER & UML chapters'] },
  mpi: { book: 'Douglas V. Hall — Microprocessors & Interfacing; Barry B. Brey — The Intel Microprocessors', drive: '“Microprocessor + Interfacing - Term Final-Q&A.pdf” + Suggestions', g: ['8086 architecture, addressing modes, interrupts, 8255 interfacing'] },
  ai: { book: 'Stuart Russell & Peter Norvig — Artificial Intelligence: A Modern Approach (AIMA)', drive: '“A.I. Questions (sectionwise)” + Afroza Ma\'am Topic.pdf + Notes', g: ['AIMA Ch 3 (uninformed + A*), 5 (adversarial/minimax)', 'Ch 2 (agents/PEAS), 7–9 (logic), 18 (learning intro)'] },
  ml: { book: 'Tom Mitchell — Machine Learning; Bishop — Pattern Recognition & ML (for depth)', drive: '✓ “Top 50 ML Interview Q&A.pdf” + ML Year Theory Q&A + ML Year (Maths).pdf', g: ['Mitchell Ch 3 (decision trees), 6 (Bayes), 8 (instance/KNN)', 'Ch 4 (neural nets/backprop), 5 (evaluating hypotheses)'] },
  compiler: { book: 'Aho, Lam, Sethi & Ullman — Compilers: Principles, Techniques & Tools (Dragon Book)', drive: '“Compiler (Review).pdf” + Q&A folder + Notes', g: ['Dragon Ch 1 (phases), 3 (lexical), 4 (parsing), 5 (SDT), 6 (intermediate), 8 (code gen)'] },
};

export const TIER_LABEL = { 1: 'Tier 1 · core', 2: 'Tier 2 · frequent', 3: 'Tier 3 · viva/depth' };
