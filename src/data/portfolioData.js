// ─── PERSONAL INFO ─────────────────────────────────────────────────────────
export const personal = {
  name: 'James Carl V. Villarosa',
  firstName: 'James Carl',
  initials: 'JCV',
  title: 'Backend-Focused Full Stack Developer',
  subtitle: 'AI Engineer · CS Student at UPLB',
  tagline: 'I build systems that work, scale, and last.',
  email: 'jamescarlvillarosa@gmail.com',
  phone: '09600524200',
  location: 'Santa Rosa City, Calabarzon, Philippines',
  github: 'https://github.com/JamesVillarosa',
  linkedin: 'https://linkedin.com/in/james-villarosa',
  available: 'Remote / Full-time',
  photo: '/james-photo.jpg',
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────
export const about = {
  bio: [
    "I'm a Computer Science student at the University of the Philippines Los Baños with a passion for building efficient and intelligent systems. As a backend-focused full-stack developer, I specialize in designing structured database architectures, optimizing algorithms, and developing scalable solutions.",
    "With hands-on experience at a Japanese-based software startup, I've shipped full-stack features across multiple client projects, led a 6-person engineering team, and managed production deployments. I'm expanding my expertise in AI, particularly NLP, multimodal systems, and LLM integrations.",
  ],
  stats: [
    { label: 'GWA', value: '1.64' },
    { label: "Dean's Lister", value: 'Every Sem' },
    { label: 'GitHub Contributions', value: '678+' },
    { label: 'Projects Shipped', value: '7+' },
  ],
  quickInfo: [
    { icon: 'location', label: 'Based in', value: 'Santa Rosa, PH' },
    { icon: 'school', label: 'School', value: 'UPLB Computer Science' },
    { icon: 'work', label: 'Open to', value: 'Remote / Full-time' },
    { icon: 'focus', label: 'Focused on', value: 'Backend · AI · Full Stack' },
  ],
}

// ─── EXPERIENCE ─────────────────────────────────────────────────────────────
export const experience = [
  {
    id: 1,
    company: 'Ten X Development',
    role: 'Software Engineer (Team Lead)',
    period: 'May 2025 – Present',
    location: 'Remote · Quezon City, Philippines',
    type: 'Internship',
    description:
      'Japanese-based software startup. Led engineering across multiple production client projects simultaneously.',
    bullets: [
      'Built and shipped full-stack features across multiple client projects including a mobile app, admin dashboard, and AI helpdesk for a Japanese restaurant client, and a kiosk system for Converge.',
      'Led a 6-person cross-functional engineering team through Agile sprint cycles, delivering 100% of planned features on schedule.',
      'Configured NGINX reverse proxy pipelines and managed Dockerized services, maintaining 99.9% uptime across production environments.',
      'Automated QA and test workflows, achieving a 40% improvement in testing accuracy and cutting average patch release time by 7 hours per cycle.',
    ],
    tech: ['Python', 'React', 'Docker', 'NGINX', 'FastAPI', 'Agile'],
  },
  {
    id: 2,
    company: 'Young Software Engineers\' Society (YSES)',
    role: 'Finance Department Lead',
    period: 'Sep 2024 – Present',
    location: 'Los Baños, Calabarzon · On-site',
    type: 'Organization',
    description:
      'Campus CS organization at UPLB. Managed budget, expense tracking, and fundraising for academic initiatives.',
    bullets: [
      'Generated 150%+ of annual funding goal through strategic product sales, setting a record revenue milestone for the organization.',
      'Assist in budgeting, expense tracking, and ensuring transparency in financial reports for the organization.',
    ],
    tech: [],
  },
]

// ─── PROJECTS ───────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    name: 'Ano-Kamo',
    subtitle: 'AI-Powered Multilingual Translation App',
    description:
      'Full-stack mobile application for Filipino language translation supporting Tagalog, Cebuano, and Hiligaynon. Features text translation, OCR, voice conversation, and community submissions. UP CMSC 190 Thesis, achieved SUS score of 84.4/100 (Grade A).',
    tech: ['Python', 'FastAPI', 'TypeScript', 'React Native', 'SQLite', 'Gemini', 'Groq Whisper', 'Azure TTS'],
    github: 'https://github.com/JamesVillarosa/ANO-KAMO',
    live: null,
    note: 'Mobile APK (Expo)',
    featured: true,
    initial: 'AK',
    color: '#2563EB',
  },
  {
    id: 2,
    name: 'Reconnect',
    subtitle: 'Alumni Tracker & Relations Management System',
    description:
      'Full-stack alumni management platform with FastAPI backend, React + Tailwind CSS frontend, and an integrated AI chat interface for automated real-time user support.',
    tech: ['FastAPI', 'React', 'Tailwind CSS', 'MongoDB', 'AI Chat'],
    github: null,
    live: 'https://reconnect-frontend.vercel.app',
    featured: false,
    initial: 'RC',
    color: '#0EA5E9',
  },
  {
    id: 3,
    name: 'AI Email Spam Filter',
    subtitle: 'NLP Bag-of-Words Classifier',
    description:
      'Naive Bayes classifier with Laplace Smoothing for spam detection. Outputs probability scores and classification statistics across labeled email datasets.',
    tech: ['Python', 'NLP', 'Naive Bayes', 'scikit-learn'],
    github: 'https://github.com/JamesVillarosa/AI-Based-Email-Spam-Filter',
    live: null,
    featured: false,
    initial: 'SF',
    color: '#6366F1',
  },
  {
    id: 4,
    name: 'Crop Circle',
    subtitle: 'Farmer-to-Consumer E-Commerce Platform',
    description:
      'MERN stack platform connecting consumers directly with farmers for fair trade. Includes ordering, product management, and sales reporting tools.',
    tech: ['MongoDB', 'ExpressJS', 'ReactJS', 'NodeJS'],
    github: 'https://github.com/JamesVillarosa/Crop-Circle',
    live: 'https://cropcircle-ecommerce.onrender.com',
    featured: false,
    initial: 'CC',
    color: '#10B981',
  },
  {
    id: 5,
    name: 'Dodo Donation System',
    subtitle: 'Mobile Donation Management App',
    description:
      'Flutter app connecting donors, organizations, and admins for donation drives, pickups, and tracking with Firebase Authentication and Firestore.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    github: 'https://github.com/JamesVillarosa/Dodo-Donation-System',
    live: null,
    featured: false,
    initial: 'DD',
    color: '#F59E0B',
  },
  {
    id: 6,
    name: 'Food Review Info System',
    subtitle: 'Database-Backed Review Platform',
    description:
      'Full-stack food review system with a comprehensive ERD, MySQL backend, and features for submitting and viewing food reviews.',
    tech: ['MySQL', 'Python', 'Flask', 'HTML'],
    github: 'https://github.com/JamesVillarosa/Food-Review-Information-System',
    live: null,
    featured: false,
    initial: 'FR',
    color: '#EF4444',
  },
  {
    id: 7,
    name: 'Predictive Analytics Solver',
    subtitle: 'Machine Learning & Optimization Tool',
    description:
      'ML tool implementing Polynomial Regression, Quadratic Spline Interpolation, and the Simplex Method for optimization, with data visualization and decision support.',
    tech: ['Python', 'Machine Learning', 'R', 'Simplex'],
    github: null,
    live: null,
    featured: false,
    initial: 'PA',
    color: '#8B5CF6',
  },
]

// ─── SKILLS ─────────────────────────────────────────────────────────────────
export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'Rust', 'COBOL', 'Scheme', 'R', 'Dart'],
  Backend: ['FastAPI', 'SQLAlchemy', 'Alembic', 'ExpressJS', 'NodeJS', 'Django', 'Flask'],
  Frontend: ['ReactJS', 'React Native', 'Expo', 'Tailwind CSS', 'HTML', 'CSS'],
  Databases: ['SQLite', 'MySQL', 'MongoDB', 'MariaDB', 'Firebase'],
  'DevOps & Tools': ['Docker', 'NGINX', 'Git', 'GitHub', 'Render.com', 'Figma'],
  'AI APIs & Models': ['Gemini', 'Claude', 'GPT-4', 'Groq Whisper', 'Azure TTS', 'Prompt Engineering', 'RAG Pipelines'],
  'AI Tooling & Workflows': ['Claude Code', 'Claude Cowork', 'MCP', 'ChatGPT', 'Gemini', 'Antigravity', 'Codex', 'Manus', 'Zapier', 'OpenClaw', 'n8n (exploring)'],
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────
export const education = {
  school: 'University of the Philippines Los Baños',
  shortSchool: 'UPLB',
  degree: 'Bachelor of Science in Computer Science',
  period: 'Sep 2022 – Present',
  gwa: '1.64',
  honors: 'Consistent Dean\'s Lister',
  scholarship: 'Santa Rosa City Scholar',
}
