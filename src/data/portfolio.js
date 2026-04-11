export const navigationItems = ['Home', 'About', 'Resume', 'Projects', 'Contact'];

export const profile = {
  name: 'Pranav Jindal',
  initials: 'PJ',
  role: 'Software Engineer',
  location: 'Mumbai, India',
  email: 'jindalpranav944@gmail.com',
  phone: '+91 7093702160',
  linkedin: 'https://linkedin.com/in/pranavjindal29',
  github: 'https://github.com/pranavjindal29',
  leetcode: 'https://leetcode.com/u/pranavjindal29/',
  gfg: 'https://www.geeksforgeeks.org/user/jindalprzpdt/',
  resume: '/Pranav_Jindal_Resume.pdf',
  headline:
    'Building ML systems, telecom research infrastructure, and polished product experiences.',
  subheadline: '',
  summary: '',
  availability:
    'Open to software engineering, machine learning, data, and platform-focused roles at product and finance-led teams.',
};

export const heroRoles = ['Frontend Engineer', 'Software Engineer', 'ML Engineer'];

export const heroStats = [
  { value: '4+', label: 'hands-on research and engineering roles' },
  { value: '54K+', label: 'images used in training workflows' },
  { value: '20+', label: 'juniors mentored in ML communities' },
  { value: 'AWS', label: 'certified cloud practitioner' },
];

export const heroStrengths = [
  { title: 'Research depth', caption: 'Institute-led problem solving' },
  { title: 'Frontend polish', caption: 'Clean responsive interfaces' },
  { title: 'Applied ML', caption: 'Training to deployment thinking' },
  { title: 'Systems thinking', caption: 'Architecture with product clarity' },
];

export const aboutParagraphs = [
  'My work sits at the intersection of software engineering, machine learning, and research-driven problem solving. I enjoy translating complex systems into products that are fast, maintainable, and easy to trust.',
  'Recently, I have contributed to 5G and 6G core network research at IIT Bombay, traffic analytics and computer vision systems at IIT Roorkee, remote sensing pipelines at DRDO, and production-facing ML delivery at SVGS IT Solutions.',
  'That range has shaped how I approach engineering: start from first principles, measure what matters, keep the UX crisp, and ship solutions that hold up beyond a demo.'
];

export const focusAreas = [
  {
    title: 'Systems Mindset',
    description: 'Comfortable moving from architecture and data flow to the product details users actually notice.',
  },
  {
    title: 'Applied ML',
    description: 'Hands-on with training, evaluation, deployment constraints, and communicating outcomes clearly.',
  },
  {
    title: 'Calm Execution',
    description: 'I like turning ambiguous ideas into structured plans, thoughtful interfaces, and dependable implementation.',
  },
];

export const techStack = [
  {
    category: 'Frontend',
    description: 'Clean, responsive interfaces with thoughtful interaction design.',
    skills: [
      { name: 'React', icon: 'logos:react' },
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'HTML', icon: 'vscode-icons:file-type-html' },
      { name: 'CSS', icon: 'skill-icons:css' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
      { name: 'Flutter', icon: 'logos:flutter' },
    ],
  },
  {
    category: 'Programming',
    description: 'Core languages and data-oriented tooling used across engineering and analytics work.',
    skills: [
      { name: 'Python', icon: 'logos:python' },
      { name: 'C++', icon: 'logos:c-plusplus' },
      { name: 'SQL', icon: 'carbon:sql' },
      { name: 'PySpark', icon: 'simple-icons:apachespark' },
      { name: 'Rasterio', icon: 'mdi:image-outline' },
      { name: 'Shapely', icon: 'mdi:vector-polygon' },
      { name: 'Leafmap', icon: 'mdi:map-outline' },
    ],
  },
  {
    category: 'AI / ML',
    description: 'Model development, evaluation, and real-world deployment tradeoffs.',
    skills: [
      { name: 'Scikit-learn', icon: 'logos:scikit-learn' },
      { name: 'XGBoost', icon: 'mdi:chart-line-variant' },
      { name: 'CNN', icon: 'mdi:brain' },
      { name: 'YOLO', icon: 'ph:eye-bold' },
      { name: 'Recommender Systems', icon: 'mdi:star-box-multiple-outline' },
      { name: 'Anomaly Detection', icon: 'mdi:chart-bell-curve-cumulative' },
    ],
  },
  {
    category: 'Data Science',
    description: 'Statistical reasoning and data preparation practices that make downstream modeling stronger.',
    skills: [
      { name: 'Statistics', icon: 'mdi:sigma' },
      { name: 'Hypothesis Testing', icon: 'carbon:chart-scatter' },
      { name: 'Data Preprocessing', icon: 'mdi:tune-vertical' },
      { name: 'Feature Engineering', icon: 'mdi:tune-variant' },
    ],
  },
  {
    category: 'Model Evaluation',
    description: 'Metrics and validation tools I rely on to judge models beyond surface-level accuracy.',
    skills: [
      { name: 'ROC-AUC', icon: 'fluent:arrow-trending-lines-24-filled' },
      { name: 'Precision', icon: 'mdi:target' },
      { name: 'Recall', icon: 'mdi:history' },
      { name: 'F1 Score', icon: 'carbon:chart-bubble' },
      { name: 'Confusion Matrix', icon: 'carbon:matrix' },
    ],
  },
  {
    category: 'Cloud & Tools',
    description: 'Tooling for shipping, experimentation, and collaboration.',
    skills: [
      { name: 'AWS (Certified)', icon: 'logos:aws' },
      { name: 'GCP', icon: 'logos:google-cloud' },
      { name: 'Docker', icon: 'logos:docker-icon' },
      { name: 'CI/CD Pipelines', icon: 'mdi:source-branch-sync' },
    ],
  },
  {
    category: 'Tools',
    description: 'Everyday tools I use for collaboration, development, and delivery.',
    skills: [
      { name: 'Git', icon: 'logos:git-icon' },
      { name: 'VS Code', icon: 'logos:visual-studio-code' },
      { name: 'IntelliJ IDEA', icon: 'logos:intellij-idea' },
    ],
  },
];

export const experience = [
  {
    title: 'Project Research Assistant',
    organization: 'Indian Institute of Technology, Bombay',
    mode: 'On-site',
    period: 'Oct 2025 - Present',
    summary:
      'Working on next-generation telecom systems with a focus on 5G standalone deployment and scalable 6G control-plane research.',
    highlights: [
      'Building a full 5G standalone testbed using Open5GS and OpenAirInterface.',
      'Analyzing AMF internals, signalling flows, and SBI interactions for deeper core-network understanding.',
      'Contributing to 6G architecture research centered on service-driven signalling and control-plane redesign.',
    ],
    stack: ['Open5GS', 'OpenAirInterface', '5G Standalone', 'AMF', 'SBI', '6G'],
  },
  {
    title: 'Project Research Associate',
    organization: 'Indian Institute of Technology, Roorkee',
    mode: 'On-site',
    period: 'Aug 2025 - Sep 2025',
    summary:
      'Worked on real-time traffic analytics and computer-vision deployment pipelines across diverse road environments.',
    highlights: [
      'Collaborated with multiple teams to deploy real-time VA-ANPR systems.',
      'Designed algorithms to improve accuracy under challenging lighting and traffic conditions.',
      'Implemented camera calibration with Depth Anything and optimized ADAS performance on Jetson devices by tuning Clearnet and YOLO models.',
    ],
    stack: ['Computer Vision', 'Depth Anything', 'YOLO', 'Jetson', 'ADAS'],
  },
  {
    title: 'Project Trainee',
    organization: 'Centre for Artificial Intelligence and Robotics, DRDO, Bangalore',
    mode: 'On-site',
    period: 'Mar 2025 - May 2025',
    summary:
      'Built practical remote-sensing tooling to make geospatial segmentation workflows more accessible and cost-efficient.',
    highlights: [
      'Led implementation of an image-segmentation pipeline using GeoSAM for remote sensing use cases.',
      'Designed a robust CPU-friendly Python workflow to reduce GPU and GIS dependencies.',
      'Extracted high-accuracy segmentation masks and geospatial data with Rasterio, Shapely, and Leafmap.',
    ],
    stack: ['Python', 'GeoSAM', 'Rasterio', 'Shapely', 'Leafmap'],
  },
  {
    title: 'Software Engineer Intern',
    organization: 'SVGS IT Solutions, Noida',
    mode: 'Hybrid',
    period: 'May 2024 - Nov 2024',
    summary:
      'Supported production-facing machine learning initiatives from data preparation to dashboards and business communication.',
    highlights: [
      'Designed and deployed ML pipelines into production for business-facing insight generation.',
      'Created dashboards to communicate model performance and key trends to stakeholders.',
      'Improved model quality through preprocessing, feature engineering, algorithm refinement, and evaluation.',
    ],
    stack: ['Python', 'ML Pipelines', 'Data Analysis', 'Dashboards', 'Feature Engineering'],
  },
  {
    title: 'Frontend Developer Intern',
    organization: 'Debug Solutions',
    mode: 'Remote',
    period: 'Feb 2024 - Apr 2024',
    summary:
      'Worked on user-facing frontend implementation with a focus on responsiveness, API integration, and performance improvements.',
    highlights: [
      'Built responsive web interfaces using HTML, CSS, and JavaScript.',
      'Integrated APIs and optimized performance to reduce load times.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'API Integration', 'Performance Optimization'],
  },
];

export const educationItems = [
  {
    institution: 'Vellore Institute of Technology',
    credential: 'Bachelor of Technology - BTech, Computer Science and Engineering',
    period: 'Sep 2021 - Jul 2025',
    grade: '8.22/10',
  },
  {
    institution: 'Doon Hills Academy',
    credential: 'All India Senior School Certificate (AISSCE)',
    period: 'Jun 2019 - May 2021',
    grade: '9.16/10',
  },
  {
    institution: 'Little Angels School',
    credential: 'Secondary School Certificate (SSC)',
    period: 'Jun 2017 - May 2019',
    grade: '8.21/10',
  },
];

export const certifications = [
  {
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta',
    issued: 'May 2024',
    credentialId: 'G6XFNU2VPFP9',
  },
  {
    title: 'Amazon Web Services Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issued: 'Jan 2024',
    expires: 'Jan 2027',
  },
  {
    title: 'MERN Full Stack Internship Program',
    issuer: 'ETHNUS',
    issued: 'Dec 2023',
    credentialId: 'VDH626P4',
  },
];

export const leadershipHighlights = [
  {
    title: 'Data Science Club VITB',
    description: 'Co-Lead since June 2023, coordinated 5+ events with a 25-member team and improved member engagement by 70%.',
  },
  {
    title: 'Mentorship',
    description: 'Mentored 20+ juniors on ML projects and conducted Python and ML workshops.',
  },
];

export const projects = [
  {
    title: 'Harvest Watch',
    period: 'Apr 2025',
    description:
      'An IoT and machine learning platform for real-time plant disease detection, designed to help farmers act earlier with on-device predictions.',
    highlights: [
      'Trained an InceptionV3-based CNN on the PlantVillage dataset with 54K+ images.',
      'Improved model quality with preprocessing, augmentation, hyperparameter tuning, and cross-validation.',
      'Converted the model to TensorFlow Lite and integrated it into an Android workflow for real-time use.',
    ],
    stack: ['Python', 'CNN', 'InceptionV3', 'TensorFlow Lite', 'Android', 'PlantVillage'],
    github: 'https://github.com/pranavjindal29/HarvestWatch',
  },
  {
    title: 'Customer Churn Prediction',
    period: 'Nov 2024',
    description:
      'A churn analytics workflow built on the Telco dataset to uncover retention drivers and improve minority-class recall through better modeling choices.',
    highlights: [
      'Handled preprocessing, null treatment, categorical encoding, and class balancing with SMOTE.',
      'Explored behavioral patterns through EDA, correlation analysis, and visual storytelling.',
      'Benchmarked Logistic Regression, Random Forest, and XGBoost using ROC-AUC, precision, recall, and F1.',
    ],
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'SMOTE', 'EDA', 'ROC-AUC'],
    github: 'https://github.com/pranavjindal29/Customer_Churn_Prediction_using_ML',
  },
];

export const socialLinks = [
  {
    name: 'Mobile',
    href: null,
    value: profile.phone,
  },
  {
    name: 'Mail',
    href: null,
    value: profile.email,
  },
  {
    name: 'GitHub',
    href: profile.github,
    value: 'GitHub',
  },
  {
    name: 'LinkedIn',
    href: profile.linkedin,
    value: 'LinkedIn',
  },
  {
    name: 'LeetCode',
    href: profile.leetcode,
    value: 'LeetCode',
  },
];
