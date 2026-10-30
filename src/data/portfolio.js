export const profile = {
  name: 'Pranav Jindal',
  initials: 'PJ',
  role: 'Software & Systems Engineer',
  location: 'Mumbai, India',
  email: 'jindalpranav944@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jindalpranav29/',
  github: 'https://github.com/pranavjindal29',
  leetcode: 'https://leetcode.com/u/pranavjindal29/',
  resume: '/Pranav_Jindal_Resume.pdf',
  headline: 'Building backend and distributed systems in C/C++ and Go, with a focus on reliability and performance.',
};

export const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

// Benchmark evidence is presented in the featured engineering case study.
// No hardware, latency values, or deployment scale claims were supplied.
const benchmark = {
  cycles: '111,679',
  duration: '300 seconds',
  throughput: '372.3',
  result: '111,679 complete cycles in 300 seconds (~372.3 cycles/sec)',
};

export const hero = {
  eyebrow: 'Currently at IIT Bombay',
  paragraphs: [
    'I build software for the moments when things get complicated: overlapping requests, shared state, and growing workloads.',
    'At IIT Bombay, I work in C/C++ and Go to make backend systems reliable.',
    'I test assumptions, trace failures, and measure how systems behave under load.',
  ],
  primaryAction: 'View Work',
  resumeAction: 'Download Resume',
  portraitAlt: 'Portrait of Pranav Jindal',
  process: ['Build', 'Test', 'Measure'],
  appointment: 'Project Research Associate',
};

export const about = {
  title: 'About',
  paragraphs: [
    'I’m a Project Research Associate at IIT Bombay, working on software reliability, testing, and performance evaluation.',
    'My earlier work includes real-time computer vision on edge devices at IIT Roorkee and satellite-image processing at DRDO, with experience in hardware-constrained deployment and research engineering.',
  ],
  areasTitle: 'Core engineering areas',
  areas: [
    'Backend & Distributed Systems',
    'Reliability & Asynchronous Processing',
    'Performance & Testing',
  ],
};

export const skills = {
  title: 'Skills & technologies',
  groups: [
    { title: 'Languages', items: ['C', 'C++', 'Go', 'Python', 'JavaScript', 'SQL'] },
    { title: 'Backend & Systems', items: ['Linux', 'REST APIs', 'Distributed Systems', 'Concurrency', 'Event-driven Systems', 'PostgreSQL', 'Docker'] },
    { title: 'Engineering & Performance', items: ['Git', 'GitHub', 'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'Performance Profiling', 'Load Testing', 'Debugging', 'CI/CD'] },
    { title: 'Applied AI / CV', items: ['YOLO', 'TensorFlow / PyTorch', 'OpenCV', 'GeoSAM', 'Edge AI', 'NVIDIA Jetson'] },
  ],
  domainLabel: 'Domain / systems exposure',
  domain: ['Open5GS', 'gNBSIM', '5G Core'],
};

export const experience = {
  title: 'Experience',
  entries: [
    {
      title: 'Project Research Associate',
      organization: 'Indian Institute of Technology Bombay',
      period: 'Oct 2025 — Present',
      current: true,
      summary: 'Developing C/C++ backend workflows, supported by unit, integration, and end-to-end testing.',
      highlights: [
        'Built event-driven, queue-based workflows to coordinate shared state and service-to-service communication.',
        'Handled duplicate, delayed, and concurrent events using request correlation, idempotency, retries, input validation, and concurrency safeguards.',
        'Built a Go-based gNBSIM load-testing framework and profiled throughput and operation-level latency under concurrent workloads.',
      ],
      stack: ['C/C++', 'Go', 'Linux', 'Open5GS', 'gNBSIM', 'REST APIs', 'Concurrency', 'Performance Testing'],
    },
    {
      title: 'Project Research Associate',
      organization: 'Indian Institute of Technology Roorkee',
      period: 'Aug 2025 — Sep 2025',
      summary: 'Real-time perception and device monitoring for edge-deployed ADAS.',
      highlights: [
        'Built and optimized YOLO-based ADAS workflows on NVIDIA Jetson.',
        'Automated camera calibration using Depth Anything, reducing manual setup effort by 50%.',
        'Built Raspberry Pi telemetry pipelines for CPU, memory, and device monitoring.',
      ],
      stack: ['Python', 'YOLO', 'NVIDIA Jetson', 'Depth Anything', 'Raspberry Pi'],
    },
    {
      title: 'Project Trainee',
      organization: 'Centre for Artificial Intelligence and Robotics, DRDO',
      period: 'Mar 2025 — May 2025',
      summary: 'Built a satellite-image segmentation pipeline using GeoSAM and Python-based geospatial tooling.',
      highlights: [
        'Reduced manual annotation effort by 60% with automated segmentation masks and geospatial boundaries.',
        'Designed CPU-friendly processing workflows using Rasterio, Shapely, and Leafmap.',
      ],
      stack: ['Python', 'GeoSAM', 'Rasterio', 'Shapely', 'Leafmap'],
    },
  ],
  earlierTitle: 'Earlier experience',
  earlier: [
    {
      title: 'Software Engineer Intern',
      organization: 'SVGS IT Solutions',
      period: 'May 2024 — Nov 2024',
      summary: 'Built Python ML pipelines, KPI dashboards, and reusable reporting workflows for recurring analysis.',
    },
    {
      title: 'Frontend Developer Intern',
      organization: 'Debug Solutions',
      period: 'Feb 2024 — Apr 2024',
      summary: 'Built responsive web interfaces, integrated APIs, and optimized page performance.',
    },
  ],
};

export const projects = {
  title: 'Featured Engineering',
  description: 'Load-testing infrastructure, backend services, and data pipelines.',
  featured: {
    category: 'Systems Engineering · IIT Bombay',
    title: 'Closed-Loop Load & Performance Testing System',
    description: 'A Go framework using the gNBSIM simulator to run concurrent client lifecycles and measure throughput and operation-level latency over a fixed test window.',
    result: benchmark.result,
    highlights: ['Concurrent workload execution', 'Duration-based test window', 'Lifecycle recreation', 'Synchronized statistics collection', 'Race-safe shutdown', 'Latency measurement', 'End-to-end validation'],
    stack: ['Go', 'Concurrency', 'Linux', 'gNBSIM', 'Performance Testing'],
    benchmark,
  },
  items: [
    {
      category: 'Backend & Product Engineering',
      title: 'PDF-IntelliExtract',
      description: 'Extracts structured profile fields from PDFs and auto-fills a React form through a Python and Node.js service layer.',
      stack: ['React', 'Node.js', 'Flask'],
      github: 'https://github.com/pranavjindal29/PDF-IntelliExtract',
      live: 'https://pdf-intelli-extract-frontend.vercel.app/',
    },
    {
      category: 'Data Engineering',
      title: 'Financial Transaction Monitoring',
      description: 'A batch AML pipeline that validates transactions, quarantines invalid records, and loads suspicious-activity alerts into PostgreSQL.',
      stack: ['PySpark', 'Pydantic', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/pranavjindal29/pyspark-financial-transaction-monitoring',
    },
    {
      category: 'Edge AI & IoT',
      title: 'HarvestWatch',
      description: 'A plant-disease detection platform combining on-device mobile inference and live field sensing.',
      stack: ['TensorFlow Lite', 'Android', 'ESP8266'],
      github: 'https://github.com/pranavjindal29/HarvestWatch',
    },
  ],
  moreTitle: 'More projects',
  more: [
    { title: 'Customer Churn Prediction', github: 'https://github.com/pranavjindal29/Customer_Churn_Prediction_using_ML' },
    { title: 'Movie Recommendation System', github: 'https://github.com/pranavjindal29/movie-recommendation-system' },
  ],
};

export const education = {
  institution: 'Vellore Institute of Technology',
  credential: 'BTech, Computer Science and Engineering',
  period: '2021–2025',
  grade: '8.22/10',
};

export const certifications = [
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', issued: 'Jan 2024', expires: 'Jan 2027' },
  { title: 'Meta Front-End Developer Specialization', issuer: 'Meta', issued: 'May 2024' },
];

export const leadership = 'Co-led the Data Science Club at VIT and mentored 20+ students through Python/ML projects and workshops.';

export const contact = {
  title: 'Let’s build something meaningful.',
  description: 'I’m open to Software Development, Backend, Systems Engineering, and related software opportunities.',
  formTitle: 'Send a message',
  formNote: 'Click my email address to copy it.',
  submitLabel: 'Send Message',
  successMessage: 'Thanks for reaching out. Your message has been sent.',
  errorMessage: 'Unable to send right now. Please email me directly.',
  links: [
    { name: 'Email', action: 'copy-email', detail: profile.email },
    { name: 'LinkedIn', href: profile.linkedin, detail: 'Connect on LinkedIn' },
    { name: 'GitHub', href: profile.github, detail: 'Explore my code' },
  ],
};

export const socialLinks = [
  { name: 'GitHub', href: profile.github },
  { name: 'LinkedIn', href: profile.linkedin },
  { name: 'Email', action: 'copy-email' },
  { name: 'LeetCode', href: profile.leetcode },
];