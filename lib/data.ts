import {
  Bot,
  Brain,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  Figma,
  GitBranch,
  LineChart,
  Mail,
  Megaphone,
  Package,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Skill = {
  name: string;
  level: number;
  icon: LucideIcon;
};

export type Project = {
  title: string;
  description: string;
  features: string[];
  accent: string;
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skills: Skill[] = [
  { name: "Python", level: 94, icon: Code2 },
  { name: "Machine Learning", level: 88, icon: Brain },
  { name: "AI Automation", level: 92, icon: Bot },
  { name: "React", level: 86, icon: Cpu },
  { name: "Next.js", level: 84, icon: Rocket },
  { name: "Tailwind CSS", level: 90, icon: Sparkles },
  { name: "Data Analytics", level: 82, icon: LineChart },
  { name: "DevOps", level: 76, icon: GitBranch },
  { name: "Docker", level: 78, icon: Package },
  { name: "API Development", level: 89, icon: Database },
  { name: "Digital Marketing", level: 80, icon: Megaphone },
  { name: "UI/UX", level: 83, icon: Figma },
];

export const projects: Project[] = [
  {
    title: "ZARVISS AI",
    description:
      "An advanced AI assistant engineered with automation, voice interaction, local LLM integration, and futuristic workflows.",
    features: [
      "Voice Assistant",
      "Local AI Models",
      "Automation Engine",
      "Real-Time Responses",
      "API Integrations",
    ],
    accent: "from-electric via-cyan-200 to-white",
  },
  {
    title: "Plant Disease Detection System",
    description:
      "Machine learning-based disease detection platform designed to identify crop diseases with high accuracy.",
    features: [
      "ML Classification",
      "Image Processing",
      "Agriculture AI",
      "Prediction Dashboard",
    ],
    accent: "from-emerald-300 via-electric to-white",
  },
  {
    title: "Event Management Platform",
    description:
      "Dynamic event management and client coordination system built for scalable event operations.",
    features: [
      "Client Management",
      "Event Tracking",
      "Analytics Dashboard",
      "Workflow Automation",
    ],
    accent: "from-violet-300 via-electric to-white",
  },
];

export const experience = [
  {
    title: "Event Planner & Client Manager",
    body: "Led client coordination, planning systems, and operational workflows for high-velocity event execution.",
    icon: BriefcaseBusiness,
  },
  {
    title: "AI Developer",
    body: "Built AI assistants, automation layers, model-driven tools, and practical intelligence systems.",
    icon: Brain,
  },
  {
    title: "Freelance Digital Marketer",
    body: "Delivered campaign strategy, audience systems, and conversion-focused digital experiences.",
    icon: Megaphone,
  },
  {
    title: "Automation Developer",
    body: "Designed workflow automation, API integrations, and repeatable systems that reduce manual effort.",
    icon: Workflow,
  },
];

export const achievements = [
  { value: 12, suffix: "+", label: "AI and automation builds" },
  { value: 25, suffix: "+", label: "Events coordinated" },
  { value: 4, suffix: "", label: "ML agriculture modules" },
  { value: 100, suffix: "%", label: "Systems mindset" },
];

export const testimonials = [
  {
    quote:
      "Debargha brings rare clarity to complex AI ideas and turns them into usable, elegant systems.",
    name: "Product Collaborator",
    role: "AI Workflow Project",
  },
  {
    quote:
      "The event workflows felt organized, fast, and calm even when the operation became intense.",
    name: "Client Partner",
    role: "Event Management",
  },
  {
    quote:
      "A creative technologist who understands both engineering depth and digital presentation.",
    name: "Brand Founder",
    role: "Digital Experience",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/", icon: GitBranch },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: BriefcaseBusiness },
  { label: "Instagram", href: "https://instagram.com/", icon: Sparkles },
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
];
