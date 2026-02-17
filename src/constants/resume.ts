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
      location: "Dhaka, Bangladesh",
      history: [
        {
          role: "Software Engineer",
          period: "Oct 2023 – Present",
          keyRole: true,
          description: "Leading frontend migration and analytics for national-scale projects serving 119M+ voters.",
          responsibilities: [
            "Architected the migration of legacy Jinja/jQuery monoliths into modular React + TypeScript ecosystems.",
            "Engineered high-volume data dashboards for Wholesale Roaming Analytics using Yaana Neustring.",
            "Digitized critical election workflows for the Bangladesh Election Commission.",
            "Optimized frontend performance reducing initial load times by 40%."
          ]
        }
      ]
    },
    {
      company: "Independent University Bangladesh",
      location: "Dhaka, Bangladesh",
      history: [
        {
          role: "Adjunct Faculty",
          period: "Jan 2024 – Jan 2025",
          keyRole: true,
          description: "Academic leadership in the Department of Computer Science and Engineering.",
          responsibilities: [
            "Conducted lab courses on Data Structures and Algorithms for undergraduate students.",
            "Mentored student groups in modern web development best practices and Git workflow.",
            "Designed assessment rubrics for frontend engineering projects."
          ]
        },
        {
          role: "Research Assistant",
          period: "Jan 2023 – Dec 2023",
          keyRole: false,
          description: "Software research and university-wide digital platform maintenance.",
          responsibilities: [
            "Developed and maintained the official IUB university website frontend using React and Redux.",
            "Collaborated on research papers focusing on software logic and optimization.",
            "Implemented responsive UI components using Tailwind CSS."
          ]
        }
      ]
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
  education: [
    {
      degree: "Bachelor of Science in Computer Science and Engineering",
      institution: "Independent University, Bangladesh",
      location: "Dhaka, Bangladesh",
      cgpa: "3.67 / 4.00",
      period: "2017 – 2021",
      keyDetails: [
        "Specialization in Software Engineering",
        "Dean's List Award recipient for academic excellence",
        "Core coursework: Data Structures, Algorithms, DBMS, and OS"
      ]
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Chattogram Cantonment Public College",
      location: "Chattogram, Bangladesh",
      cgpa: "5.00 / 5.00",
      period: "2014 – 2016",
      keyDetails: [
        "Group: Science",
        "GPA 5.00 achievement in all subjects",
        "Focused on Advanced Mathematics, Physics, and Higher Biology"
      ]
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Chattogram Cantonment Public College",
      location: "Chattogram, Bangladesh",
      cgpa: "5.00 / 5.00",
      period: "2012 – 2014",
      keyDetails: [
        "Group: Science",
        "Strong foundation in Mathematics and General Sciences"
      ]
    }
  ],
  location: "Dhaka, Bangladesh",
  aboutMe:`Software Engineer with 3+ years of experience in React and TypeScript development, specializing in architecting robust,
scalable frontend systems using React, TypeScript, and Redux, with a proven track record of delivering high-security,
national-scale digital infrastructure for government commissions and global B2B analytics. Beyond enterprise solutions,
I am an active builder of interactive personal projects—ranging from full-stack e-commerce platforms to real-time digital
board games. I leverage AI-driven development tools to accelerate coding workflows, optimize performance, and
maintain high standards of code quality, ensuring rapid delivery without compromising on security or user experience.`
};