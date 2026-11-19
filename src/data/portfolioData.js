// Content mirrors the latest resume (AI / Automation Engineer).

export const personal = {
  name: 'James Carl V. Villarosa',
  firstName: 'James Carl',
  initials: 'JCV',
  title: 'AI & Automation Engineer',
  tagline: 'I build systems that work, scale, and last.',
  email: 'jamescarlvillarosa@gmail.com',
  phone: '09600524200',
  location: 'Santa Rosa City, Calabarzon, Philippines',
  github: 'https://github.com/JamesVillarosa',
  linkedin: 'https://linkedin.com/in/james-villarosa',
  available: 'Remote / Full-time',
  photo: '/james-photo.jpg',
}

export const about = {
  bio: [
    "I'm an AI and automation engineer with two years of professional remote experience and a full-stack background in React, TypeScript, Node.js and Python.",
    "Right now I'm the sole AI/automation engineer at a UK ecommerce company. I built and own its in-house operations platform, plus the n8n automations, AI agents, MCP servers and Zapier integrations that connect the team's tools. I use Claude Code and Cursor daily, and I review and test generated code before it ships.",
    "I graduated in Computer Science from the University of the Philippines Los Baños with a GWA of 1.58, a consistent Dean's Lister.",
  ],
  stats: [
    { label: 'Years remote experience', value: '2' },
    { label: 'GWA (honors level)', value: '1.58' },
    { label: 'GitHub contributions', value: '678+' },
    { label: "Dean's Lister", value: 'Every Sem' },
  ],
  quickInfo: [
    { label: 'Based in', value: 'Santa Rosa, PH' },
    { label: 'Degree', value: 'BS Computer Science, UPLB' },
    { label: 'Open to', value: 'Remote / Full-time' },
    { label: 'Focused on', value: 'AI · Automation · Full stack' },
  ],
}

export const experience = [
  {
    id: 1,
    company: 'UK Ecommerce Company',
    role: 'AI / Automation Engineer',
    period: 'Sep 2025 – Present',
    location: 'Remote',
    type: 'Full-time',
    description: 'Sole engineer and owner of the company’s in-house operations platform and automations.',
    bullets: [
      'Built an in-house operations platform from scratch: team chat, per-user schedule and task screens, Connecteam-style timesheets, and document and video sections in one system for the whole team.',
      'Built and run the n8n automations behind the company’s internal workflows, working alongside AI agents, MCP servers (including Google MCP) and Zapier to connect tools through REST APIs, webhooks and JSON.',
      'Took the system from requirements to delivery on my own, owning architecture, build and ongoing maintenance, working async with direct access to company leadership.',
      'Use Claude Code and Cursor daily to write, edit and debug JavaScript and TypeScript, reviewing and testing generated code before it ships.',
    ],
    tech: ['n8n', 'AI agents', 'MCP', 'Zapier', 'TypeScript', 'React', 'Claude Code'],
  },
  {
    id: 2,
    company: 'Japanese Software Startup',
    role: 'Full Stack Developer / Team Lead',
    period: 'May 2024 – Sep 2025',
    location: 'Remote',
    type: 'Full-time',
    description: 'Full-stack features across multiple concurrent client and SaaS projects.',
    bullets: [
      'Built a multi-platform system orchestrating LinkedIn, Facebook, Twitter/X and Instagram APIs into automated pipelines and analytics dashboards through webhook-driven workflows and async processing.',
      'Delivered production-ready features across concurrent client and SaaS projects: responsive React front ends and Node.js / Express REST APIs, built from product requirements in agile sprints.',
      'Designed and maintained backend services and API integrations across MongoDB and SQL data stores, with JWT auth and role-based access.',
      'Led a 6-person cross-functional team through sprint cycles, reviewing code and flagging blockers early across a distributed remote team.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'SQL', 'JWT'],
  },
  {
    id: 3,
    company: "Young Software Engineers' Society (YSES)",
    role: 'Finance Member',
    period: 'UPLB',
    location: 'Los Baños, Laguna',
    type: 'Leadership',
    description: 'Campus computer science organization at UPLB.',
    bullets: [
      'Generated 150%+ of the annual funding goal through strategic product sales, setting a record revenue milestone for the organization.',
    ],
    tech: [],
  },
]

// logo: file in /public/projects. color: cover background. ink: text colour on the cover.
export const projects = [
  {
    id: 1,
    name: 'Ano-Kamo',
    subtitle: 'Voice AI platform · solo built, end to end',
    description:
      'Designed, built and launched the whole product alone: front end, REST backend, database schema, RAG pipeline and a streaming speech-to-text / text-to-speech voice loop for Filipino languages. Engineered for correctness with hallucination detection, structured observability logging and retry with exponential backoff. Validated with 20 real users at SUS 84.4/100, Grade A (UP CMSC 190 thesis).',
    tech: ['React Native (Expo)', 'TypeScript', 'Python (FastAPI)', 'PostgreSQL', 'Supabase', 'Groq Whisper', 'Azure TTS', 'Gemini API', 'RAG'],
    github: 'https://github.com/JamesVillarosa/ANO-KAMO',
    live: null,
    logo: 'anokamo.png',
    color: '#ffd56b',
    ink: '#0b1f33',
  },
  {
    id: 2,
    name: 'Golden Valley',
    subtitle: 'Operations app for a real operating business',
    description:
      'A delivery-based business system built end to end: order and delivery management, an offline queue with reliable sync for field staff, fuzzy-matching deduplication of customer records, role-based access, and a real-time admin dashboard for the owner.',
    tech: ['React Native (Expo)', 'TypeScript', 'Supabase', 'PostgreSQL', 'Auth + RLS'],
    github: 'https://github.com/JamesVillarosa/GoldenValley-2.0',
    live: 'https://golden-valley-theta.vercel.app',
    logo: 'goldenvalley.png',
    logoScale: 1.7,
    color: '#1f3d2b',
  },
  {
    id: 3,
    name: 'Voltline Job Board',
    subtitle: 'Job board for an electrical contractor',
    description:
      'Every job in one list with status filters, debounced search and URL-synced sorting, a job page with notes and a status timeline, overdue alerts, a morning digest endpoint for n8n or Zapier, and a chat panel that answers questions about the board. 22 Playwright end-to-end tests run in CI against real Postgres.',
    tech: ['Next.js', 'TypeScript', 'Postgres (Neon)', 'Tailwind CSS', 'Playwright', 'GitHub Actions'],
    github: 'https://github.com/JamesVillarosa/voltline-job-board',
    live: 'https://voltline-job-board.vercel.app',
    logo: 'voltline.svg',
    color: '#4b6bff',
  },
  {
    id: 4,
    name: 'Reconnect',
    subtitle: 'Alumni tracker and relations management system',
    description:
      'Full-stack alumni management platform with a FastAPI backend, a React + Tailwind CSS frontend, and an integrated AI chat interface for real-time user support.',
    tech: ['FastAPI', 'React', 'Tailwind CSS', 'MongoDB', 'AI chat'],
    github: null,
    live: null,
    note: 'Private repository',
    logo: 'reconnect.png',
    color: '#e6f2fb',
    ink: '#0b1f33',
  },
  {
    id: 5,
    name: 'Crop Circle',
    subtitle: 'Farmer-to-consumer ecommerce platform',
    description:
      'MERN platform connecting consumers directly with farmers for fair trade, with ordering, product management and sales reporting tools.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/JamesVillarosa/Crop-Circle',
    live: null,
    logo: 'cropcircle.svg',
    color: '#10B981',
  },
  {
    id: 6,
    name: 'Dodo Donation System',
    subtitle: 'Mobile donation management app',
    description:
      'Flutter app connecting donors, organizations and admins for donation drives, pickups and tracking, with Firebase Authentication and Firestore.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    github: 'https://github.com/JamesVillarosa/Dodo-Donation-System',
    live: null,
    logo: 'dodo.png',
    color: '#F59E0B',
  },
  {
    id: 7,
    name: 'AI Email Spam Filter',
    subtitle: 'NLP bag-of-words classifier',
    description:
      'Naive Bayes classifier with Laplace smoothing for spam detection. Outputs probability scores and classification statistics across labeled email datasets.',
    tech: ['Python', 'NLP', 'Naive Bayes', 'scikit-learn'],
    github: 'https://github.com/JamesVillarosa/AI-Based-Email-Spam-Filter',
    live: null,
    logo: 'spamfilter.svg',
    color: '#6366F1',
  },
  {
    id: 8,
    name: 'Food Review Info System',
    subtitle: 'Database-backed review platform',
    description:
      'Full-stack food review system with a complete ERD, a MySQL backend, and features for submitting and viewing food reviews.',
    tech: ['MySQL', 'Python', 'Flask', 'HTML'],
    github: 'https://github.com/JamesVillarosa/Food-Review-Information-System',
    live: null,
    logo: 'foodreview.svg',
    color: '#EF4444',
  },
  {
    id: 9,
    name: 'Predictive Analytics Solver',
    subtitle: 'Machine learning and optimization tool',
    description:
      'Implements polynomial regression, quadratic spline interpolation and the Simplex method for optimization, with data visualization for decision support.',
    tech: ['Python', 'Machine learning', 'R', 'Simplex'],
    github: null,
    live: null,
    note: 'Coursework, private',
    logo: 'predictive.svg',
    color: '#8B5CF6',
  },
]

export const skills = {
  'AI & Automation': ['n8n (production)', 'AI agents', 'Agentic workflows', 'MCP servers', 'Zapier', 'Webhooks', 'LLM workflows', 'RAG pipelines', 'Intent classification', 'Hallucination detection', 'Claude API', 'Gemini API'],
  'AI-Assisted Development': ['Claude Code', 'Cursor', 'Codex', 'Prompt engineering', 'Structured outputs', 'Reviewing & testing generated code'],
  'Back-End & Data': ['JavaScript', 'TypeScript', 'Node.js', 'Express', 'REST APIs', 'Python (FastAPI)', 'MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Docker'],
  'Front-End': ['React', 'Next.js (App Router)', 'React Native (Expo)', 'Tailwind CSS', 'Responsive UI'],
  'Practices & Reliability': ['Git & GitHub', 'Structured logging', 'Observability', 'Async processing', 'Error handling', 'Secure development', 'JWT & role-based auth', 'CI/CD', 'Agile'],
  'Other Languages': ['Java', 'C', 'Rust', 'R', 'Dart', 'COBOL', 'Scheme'],
}

export const education = {
  school: 'University of the Philippines Los Baños',
  degree: 'Bachelor of Science in Computer Science',
  period: '2022 – 2026',
  gwa: '1.58',
  honors: "Consistent Dean's Lister",
  scholarship: 'Santa Rosa City Scholar',
}
