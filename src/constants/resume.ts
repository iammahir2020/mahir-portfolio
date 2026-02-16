import type { ResumeData } from "../types";

export const RESUME_DATA: ResumeData = {
  name: "Mahir Al Kamal",
  role: "Software Engineer | Frontend",
  email: "mahiralkamal.mak@gmail.com",
  github: "iammahir2020",
  linkedin: "mahiralkamal",
  skills: {
    frontend: ["React.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Jinja", "jQuery", "Ag-Grid"],
    stateManagement: ["Redux", "Redux Thunk", "Context API"],
    backend: ["Node.js", "Express.js", "MongoDB", "Firestore", "PostgreSQL", "Python"],
    tools: ["AWS QuickSight", "Tailwind CSS", "Firebase", "Stripe", "Vercel", "Socket.io", "Git", "GitHub", "GitLab"]
  },
  experience: [
    {
      company: "Penta Global Limited",
      role: "Software Engineer",
      period: "Oct 2023 – Present",
      description: "Leading frontend migration and analytics for national-scale projects. Migrated legacy Jinja/jQuery features into modular React + TypeScript components. Built high-volume data dashboards for Wholesale Roaming Analytics (Yaana Neustring) and digitized election workflows for the Bangladesh Election Commission serving 119M+ voters."
    },
    {
      company: "Independent University Bangladesh",
      role: "Adjunct Faculty & Research Assistant",
      period: "Jan 2023 – Jan 2025",
      description: "Conducted lab courses on programming, data structures, and algorithms. Mentored students in web development and frontend best practices. Developed and maintained the IUB university website frontend using React, TypeScript, Tailwind CSS, and Redux."
    }
  ],
  projects: [
    {
      title: "Yaana Neustring (Wholesale Roaming Analytics)",
      tech: ["React.js", "TypeScript", "Jinja", "jQuery", "Redux", "AWS QuickSight"],
      description: "B2B roaming analytics platform. Migrated legacy features into modular React components and developed Amazon QuickSight dashboards using custom analytical queries.",
      longDescription: "Worked on a B2B roaming analytics platform built with Jinja and jQuery, progressively migrated to a modern React + TypeScript architecture. Built high-volume data dashboards and dynamic tables for analytics workflows.",
      features: [
        "Migrated legacy features into modular React components",
        "Built high-volume data dashboards",
        "Developed Amazon QuickSight dashboards with custom queries"
      ],
      image: "/projects/yaana.jpg"
    },
    {
      title: "EMS & Online Nomination System",
      tech: ["React.js", "Redux", "JavaScript (ES6)", "Inhouse Component Library"],
      description: "National-scale election platforms for the Bangladesh Election Commission serving 119M+ voters.",
      longDescription: "National-scale election platforms digitizing voter, nomination, and result management workflows for Bangladesh Election Commission. Optimized React UI rendering to support high-traffic result declaration.",
      features: [
        "Developed frontend modules serving 119M+ voters",
        "High-performance components for real-time result reporting",
        "Optimized UI for high-traffic result declaration"
      ],
      image: "/projects/ems.jpg"
    },
    {
      title: "ACC ERP Platform",
      tech: ["React.js", "Redux", "JavaScript (ES6)", "Inhouse Component Library"],
      description: "Governance ERP system for tracking and operational transparency for the Anti-Corruption Commission.",
      longDescription: "Developed React-based frontend modules for case and workflow management. Integrated secure APIs to unify data and user actions in a single interface.",
      features: [
        "Case and workflow management modules",
        "Integrated secure APIs for unified data actions",
        "Improved workflow efficiency through structured UI and API-driven views"
      ],
      image: "/projects/acc.jpg"
    }
  ],
  petProjects: [
    {
      title: "Battle of Polashi",
      tech: ["React.js", "Socket.io", "Node.js", "FireStore", "Tailwind CSS"],
      description: "Real-time multiplayer social deduction board game with complex state sync.",
      longDescription: "A digital social deduction game requiring millisecond-perfect state synchronization. It features hidden-role mechanics, real-time player interactions, and automated game-master logic using WebSockets.",
      features: [
        "WebSocket integration for instant player actions",
        "Complex hidden-role and game-loop logic",
        "Real-time state management with FireStore",
        "Interactive UI with framer-motion animations"
      ],
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1974&auto=format&fit=crop",
      githubFrontendRepo: "https://github.com/iammahir2020/polashi-client",
      githubBackendRepo: "https://github.com/iammahir2020/polashi-server",
      liveSite: "https://battle-of-polashi.vercel.app"
    },
    {
      title: "Voter Management & Digital Outreach",
      tech: ["React.js", "Tailwind CSS", "Ag-Grid", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "modern-screenshot"],
      description: "Centralized platform to streamline voter area identification and automate personalized digital voting slips.",
      longDescription: "A centralized platform designed to streamline voter area identification and automate the generation of personalized digital voting slips for grassroots campaigning.",
      features: [
        "Advanced searchable interface for complex location hierarchies",
        "Dynamic 'Digital Voter Slip' generator for PDF documents",
        "Adaptive Ag-Grid integration for large-scale databases"
      ],
      image: "/projects/voter.jpg"
    },
    {
      title: "ZipGrip Tooling",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Stripe"],
      description: "Full-stack e-commerce platform with secure authentication, profile management, and order handling.",
      longDescription: "Built a full-stack e-commerce platform with secure authentication, profile management, and order handling. Integrated Stripe API for secure payments.",
      features: [
        "Integrated Stripe API for secure payments",
        "Admin dashboard for inventory updates and order tracking",
        "Secure authentication and profile management"
      ],
      image: "/projects/zipgrip.jpg"
    }
  ],
  education: {
    degree: "Bachelor of Science in Computer Science and Engineering",
    institution: "Independent University, Bangladesh",
    cgpa: "3.67 / 4.00",
    year: "2021"
  },
  location: "Dhaka, Bangladesh"
};