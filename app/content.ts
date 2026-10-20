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

export interface AccomplishmentSlot {
  year: string;
  title: string;
  org: string;
  detail: string;
}

export const profile = {
  name: "Benedict Fusin",
  handle: "tensorkai",
  github: "https://github.com/tensorkai",
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

export const accomplishmentSlots: AccomplishmentSlot[] = [
  {
    year: "Active",
    title: "Google Developer Groups on Campus PUP",
    org: "Polytechnic University of the Philippines — Sta. Mesa",
    detail:
      "Building alongside student developers and engineers across web, AI, and hardware initiatives.",
  },
  {
    year: "Ongoing",
    title: "BS Electronics Engineering (ECE)",
    org: "PUP Sta. Mesa · Manila & Hangzhou",
    detail:
      "Bridging electronics engineering fundamentals, embedded systems, and modern machine learning.",
  },
  {
    year: "Next",
    title: "Hackathons, Research & Milestones",
    org: "Detailed timeline to be added",
    detail:
      "Awards, competition entries, and technical publications will be cataloged in this section.",
  },
];
