export type PillarKey = "code" | "circuits" | "canvas";

export interface Pillar {
  key: PillarKey;
  index: string;
  label: string;
  domain: string;
  title: string;
  body: string;
  deliverables: string[];
  artifacts: string[];
}

export interface TechItem {
  name: string;
  logo: string;
}

export interface StackCategory {
  group: string;
  subtitle: string;
  items: TechItem[];
}

export interface ProjectSlot {
  code: string;
  title: string;
  domain: string;
  summary: string;
  tags: string[];
  status: string;
  href?: string;
  preview?: { src: string; alt: string };
}

export interface BackgroundEntry {
  id: string;
  logo?: string;
  title: string;
  organization: string;
  category: string;
  period?: string;
  detail?: string;
  href?: string;
  linkLabel?: string;
}

export const profile = {
  name: "Benedict Fusin",
  handle: "tensorkai",
  github: "https://github.com/tensorkai",
  linkedin: "https://www.linkedin.com/in/benedictfusin1ece",
  motto: "Turning what if into it works.",
  intro:
    "I give ideas somewhere to live: a model, a microcontroller, a screen, sometimes a canvas.",
  study: "BS Electronics Engineering · PUP Sta. Mesa",
  community: "Google Developer Groups on Campus PUP",
  locations: ["Manila, Philippines", "Hangzhou, China"],
  practice: {
    heading: "Showing up is the whole method.",
    stats: [
      { value: "415", label: "Contributions in the last year" },
      { value: "62", label: "Active shipping days" },
      { value: "9d", label: "Longest daily streak" },
      { value: "8", label: "Peak commits in a day" },
    ],
    breakdown: [
      { label: "AI, Models & Full-Stack Web", share: 48 },
      { label: "Embedded Firmware, Robotics & IoT", share: 32 },
      { label: "MATLAB Virtual Labs & Visual Art", share: 20 },
    ],
  },
};

export const pillars: Pillar[] = [
  {
    key: "code",
    index: "01",
    label: "Code",
    domain: "AI & Full-Stack Systems",
    title: "Intelligence, out in the world.",
    body: "Taking AI and machine learning models off the notebook and into responsive products people can actually use—from full-stack web interfaces down to local edge inference.",
    deliverables: [
      "End-to-end web platforms built with Next.js, React, Vue, and TypeScript",
      "FastAPI, NestJS & Spring services wired to PostgreSQL, MongoDB, and MySQL",
      "PyTorch, TensorFlow, Hugging Face, LangChain & local Ollama inference pipelines",
    ],
    artifacts: ["Edge AI Integration", "Full-Stack Web", "LLM & Agent Pipelines"],
  },
  {
    key: "circuits",
    index: "02",
    label: "Circuits",
    domain: "Embedded Hardware & IoT",
    title: "Code with a pulse.",
    body: "SecuWear, NodeMCU robotics, sensor systems, and IoT experiments that reach beyond the screen and act in the physical room.",
    deliverables: [
      "SecuWear wearable safety hardware and real-time telemetry prototypes",
      "NodeMCU / ESP-based robotics, motor actuation, and wireless control loops",
      "Multi-sensor acquisition, signal conditioning, and embedded C/MicroPython firmware",
    ],
    artifacts: ["SecuWear", "NodeMCU Robotics", "IoT Sensor Systems"],
  },
  {
    key: "canvas",
    index: "03",
    label: "Canvas",
    domain: "Simulation & Visual Craft",
    title: "A different kind of resolution.",
    body: "MATLAB virtual laboratories, painted portraits, and observational landscapes. Learning by making things visible.",
    deliverables: [
      "Interactive MATLAB virtual laboratories for electronics and signal modeling",
      "Portrait and landscape studies exploring light, proportion, and composition",
      "Visual interfaces where technical accuracy meets deliberate editorial craft",
    ],
    artifacts: ["MATLAB Virtual Labs", "Painted Portraits", "Landscapes"],
  },
];

export const stack: StackCategory[] = [
  {
    group: "Frontend",
    subtitle: "Web & Cross-Platform Interfaces",
    items: [
      { name: "JavaScript", logo: "/tech/javascript.svg" },
      { name: "TypeScript", logo: "/tech/typescript.svg" },
      { name: "React", logo: "/tech/react.svg" },
      { name: "Next.js", logo: "/tech/nextjs.svg" },
      { name: "Vue", logo: "/tech/vuejs.svg" },
      { name: "Tailwind CSS", logo: "/tech/tailwindcss.svg" },
      { name: "Flutter", logo: "/tech/flutter.svg" },
      { name: "Dart", logo: "/tech/dart.svg" },
    ],
  },
  {
    group: "Backend & Databases",
    subtitle: "APIs, Services & Data Stores",
    items: [
      { name: "Node.js", logo: "/tech/nodejs.svg" },
      { name: "FastAPI", logo: "/tech/fastapi.svg" },
      { name: "NestJS", logo: "/tech/nestjs.svg" },
      { name: "Spring", logo: "/tech/spring.svg" },
      { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
      { name: "MongoDB", logo: "/tech/mongodb.svg" },
      { name: "MySQL", logo: "/tech/mysql.svg" },
    ],
  },
  {
    group: "AI & Machine Learning",
    subtitle: "Deep Learning, LLMs & Local Inference",
    items: [
      { name: "Python", logo: "/tech/python.svg" },
      { name: "PyTorch", logo: "/tech/pytorch.svg" },
      { name: "TensorFlow", logo: "/tech/tensorflow.svg" },
      { name: "Hugging Face", logo: "/tech/huggingface.svg" },
      { name: "LangChain", logo: "/tech/langchain.svg" },
      { name: "Ollama", logo: "/tech/ollama.svg" },
    ],
  },
];

export const projectSlots: ProjectSlot[] = [
  {
    code: "beacon", title: "Beacon", domain: "Preparedness",
    summary: "A household preparedness workspace for emergency plans, go-bag checklists, and evacuation information.",
    tags: ["Household plans", "Go-bag", "Evacuation"], status: "Web app",
    href: "https://beacon-mu-drab.vercel.app",
    preview: { src: "/projects/beacon.webp", alt: "Beacon home screen with household planning, go-bag checklist, and evacuation tools" },
  },
  {
    code: "pylon", title: "Pylon", domain: "Academic AI",
    summary: "An academic companion for PUP Manila, bringing research, writing, and campus guidance into one workspace.",
    tags: ["Research", "Writing", "Campus guidance"], status: "Web app",
    href: "https://pylon-llm.vercel.app",
    preview: { src: "/projects/pylon.webp", alt: "Pylon academic workspace with research prompts and a writing assistant" },
  },
  {
    code: "istud", title: "iStud", domain: "Education",
    summary: "A dedicated study workspace that brings learning and focus together.",
    tags: ["Learning", "Focus"], status: "Web app",
    href: "https://i-stud.vercel.app",
    preview: { src: "/projects/istud.webp", alt: "iStud guest workspace with study decks, focus tools, and learning progress" },
  },
  {
    code: "chipr", title: "Chipr", domain: "Finance",
    summary: "A workspace for tracking personal and business finances.",
    tags: ["Personal finance", "Business finance"], status: "Web app",
    href: "https://chipr-smoky.vercel.app",
    preview: { src: "/projects/chipr.webp", alt: "Chipr public landing and sign-in screen for its private finance workspace" },
  },
  {
    code: "loompoint", title: "Loompoint", domain: "AI workspace",
    summary: "An AI chat workspace for connecting local models and cloud endpoints, with tools for coding and writing.",
    tags: ["AI chat", "Local models", "Cloud endpoints"], status: "Web app",
    href: "https://fusin-barangay-ai.vercel.app",
    preview: { src: "/projects/loompoint.webp", alt: "Loompoint AI chat workspace with coding and writing tools" },
  },
];

// Source: https://www.linkedin.com/in/benedictfusin1ece
export const education: BackgroundEntry[] = [
  {
    id: "pup-ece",
    title: "Electronics Engineering",
    organization: "Polytechnic University of the Philippines",
    category: "Sta. Mesa, Manila",
    period: "2024 - 2027",
    detail: "Building a foundation in electronics engineering at PUP's Sta. Mesa campus in Manila.",
  },
];

export const experience: BackgroundEntry[] = [
  {
    id: "gdg-pup",
    logo: "/organizations/gdg.webp",
    title: "IoT Co-Lead",
    organization: "Google Developer Groups on Campus PUP",
    category: "Leadership",
    period: "Oct 2026–Present",
    detail: "Lead the Internet of Things track, planning workshops and hands-on builds for members. I mentor cadets on sensors, microcontrollers, and connecting devices to AI and cloud services, and I coordinate with the core team on events and technical direction.",
  },
  {
    id: "cisco-netconnect",
    logo: "/organizations/cisco.svg",
    title: "Developer Network Cadet",
    organization: "Cisco NetConnect PUP, Manila",
    category: "Training",
    period: "Sep 2026–Present",
    detail: "Training in networking, developer tooling, and network automation through Cisco's student program. I take part in workshops and community projects that connect networking fundamentals with software development.",
  },
  {
    id: "iecep",
    logo: "/organizations/iecep.png",
    title: "Manila Student Chapter Associate",
    organization: "IECEP",
    category: "Community involvement",
    period: "Jan 2026–Present",
    detail: "Support the Manila student chapter's programs, events, and member engagement for electronics engineering students. I help organize technical seminars and networking activities across the chapter.",
  },
  {
    id: "datacamp",
    logo: "/organizations/datacamp.svg",
    title: "AI Engineering for Data Science and Developer Scholar",
    organization: "DataCamp",
    category: "Scholarship",
    period: "Dec 2025–Present",
    detail: "Studying machine learning and AI engineering. I work through hands-on coursework in Python, data analysis, and model building, and apply it to my own projects.",
  },
];
