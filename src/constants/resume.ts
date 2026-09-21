import type { ResumeData } from "../types";

export const RESUME_DATA: ResumeData = {
  name: "Mahir Al Kamal",
  role: "Software Engineer",
  email: "mahiralkamal.mak@gmail.com",
  github: "iammahir2020",
  linkedin: "mahiralkamal",
  resumeLink: "https://drive.google.com/uc?export=download&id=1pJUO0Lo8fpGPVWFTA0cZVjm8T6DoWwlC",

  skills: {
    languages: ["TypeScript", "JavaScript (ES6+)", "Python", "HTML5", "CSS3"],
    frontend: ["React", "Next.js", "Redux Toolkit", "RTK Query", "React Router", "Tailwind CSS", "shadcn/ui", "Bootstrap", "Vite", "PWA"],
    backend: ["Node.js", "Express", "FastAPI", "REST APIs", "GraphQL", "AppSync", "WebSockets", "Socket.io", "JWT", "RBAC", "Keycloak"],
    databases: ["PostgreSQL", "MongoDB", "DynamoDB", "Mongoose", "IndexedDB"],
    cloud: ["Lambda", "API Gateway", "AppSync", "DynamoDB Streams", "EventBridge", "SQS", "Cognito", "EC2", "IAM", "CDK", "Amplify", "QuickSight"],
    testing: ["Vitest", "React Testing Library", "Playwright", "pytest"],
    aiMl: ["LangChain", "RAG", "Chroma", "MCP", "Gemini Vision API", "OpenCV", "Tesseract OCR", "CNN"],
    tooling: ["Git", "GitHub", "Docker", "Turborepo", "Vercel", "Render", "Figma", "Postman"],
    aiAssistedDev: ["Claude Code", "Spec-Driven Development", "Skills Authoring", "MCP Integrations", "Context Curation"]
  },
  experience: [
    {
      company: "Penta Global Limited",
      location: "Dhaka, Bangladesh",
      history: [
        {
          role: "Frontend Developer",
          period: "Oct 2023 – Present",
          keyRole: true,
          description: "Shipped features on enterprise and government platforms as part of the frontend team, translating business-analyst requirements into delivered screens alongside backend engineers.",
          responsibilities: [
            "Cut the maintenance cost of legacy screens by migrating server-rendered Jinja and jQuery pages to component-based React with typed state, replacing scattered DOM manipulation with a predictable data flow.",
            "Mentored two frontend interns who were later hired full-time."
          ],
          subProjects: [
            {
              name: "Election Management System & Online Nomination System",
              subtitle: "Bangladesh Election Commission",
              description: "A national platform for candidate nomination and election administration, used by returning officers, candidates and election staff.",
              bullets: [
                "Built nomination-submission and election-administration screens for a national platform, implementing multi-stage validation so candidate filings could not advance with incomplete or contradictory data.",
                "Handled permission-dependent rendering across several officer roles, so returning officers, candidates and administrators each saw only the actions their role allowed, against strict auditability requirements."
              ]
            },
            {
              name: "Neustring",
              subtitle: "B2B telecom roaming analytics",
              description: "A B2B analytics product giving telecom operators visibility into cross-network roaming activity and revenue.",
              bullets: [
                "Made large roaming datasets usable for analysts by building filterable data tables and chart-driven reporting views, keeping the interface responsive as result sets grew through pagination, memoized selectors and controlled re-renders.",
                "Delivered export flows that let analysts pull filtered result sets out of the dashboard directly, removing a manual data-request step from their reporting loop.",
                "Built Amazon QuickSight dashboards alongside the custom UI, giving stakeholders a self-serve reporting layer over the same roaming data."
              ]
            },
            {
              name: "ACC ERP",
              subtitle: "enterprise resource planning",
              description: "An internal ERP with role-gated modules covering different departmental workflows.",
              bullets: [
                "Developed role-gated modules and multi-step forms with cross-field dependencies, wiring frontend state to REST services and keeping partially completed submissions recoverable."
              ]
            }
          ]
        }
      ]
    },
    {
      company: "Independent University Bangladesh",
      location: "Dhaka, Bangladesh",
      history: [
        {
          role: "Adjunct Faculty & Research Assistant",
          period: "Jan 2023 – Jan 2025; Apr 2026 – Present",
          keyRole: true,
          description: "Teach two lab courses in Python, CSE211L (Algorithms) and CSE203 (Data Structures), covering sorting, graph traversal, greedy algorithms and dynamic programming.",
          responsibilities: [
            "Produce a full semester of material per term: browser-based teaching tools with live algorithm visualizations, Colab notebooks, quiz and contest sets, viva assessments, and Excel mark workbooks.",
            "Worked on the frontend of the team that built and maintains the university's public website."
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
      coverImage: "/projects/yaana/cover.svg",
      gallaryImages: []
    },
    {
      title: "EMS & Online Nomination System",
      tech: ["React.js", "Redux", "JavaScript (ES6)", "Inhouse Component Library"],
      description: "National-scale election platforms for the Bangladesh Election Commission.",
      longDescription: "National-scale election platforms digitizing voter, nomination, and result management workflows for Bangladesh Election Commission. Optimized React UI rendering to support high-traffic result declaration.",
      features: [
        "Developed frontend modules for national-scale election workflows",
        "High-performance components for real-time result reporting",
        "Optimized UI for high-traffic result declaration"
      ],
      coverImage: "/projects/ems/cover.svg",
      gallaryImages: []
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
      coverImage: "/projects/acc/cover.svg",
      gallaryImages: []
    },
    {
      title: "Independent University Bangladesh Official Website",
      tech: ["React.js", "Redux", "Tailwind CSS"],
      description: "Official university website built with React and Redux, featuring responsive design and dynamic content management.",
      longDescription: "Led the development of the official university website using React and Redux. Implemented responsive design with Tailwind CSS and integrated dynamic content management features.",
      features: [
        "Built with React and Redux for dynamic content management",
        "Implemented responsive design using Tailwind CSS",
        "Collaborated with university stakeholders for feature requirements"
      ],
      coverImage: "/projects/iub/cover.webp",
      gallaryImages: []
    }
  ],
  petProjects: [
    {
      title: "Exam Script Mark Scanner",
      tech: ["Python", "FastAPI", "OpenCV", "CNN", "Tesseract", "Gemini Vision API", "React", "TypeScript", "Docker", "pytest"],
      description: "A tool that lets an instructor grade paper exam scripts by photographing the marks grid and auto-extracting scores into Excel.",
      longDescription: "Piloted on a live CSE211L class. The printed grid itself is designed for accuracy on cheap hardware — fixed cells, corner markers, one digit per box, a validating totals row. OpenCV detects and deskews that grid, then splits it into cells from the detected line positions rather than fixed coordinates. Recognition runs behind a swappable interface — either a local CNN or Tesseract plus the Gemini Vision API — and the pipeline fails loudly on a grid mismatch rather than risk writing a mark into the wrong column. Student-ID crops never leave the machine, by design.",
      features: [
        "OpenCV-based grid detection, deskew, and cell segmentation",
        "Swappable local CNN / cloud recognizer behind one interface",
        "Fails loudly on mismatch instead of guessing",
        "pytest suite across detection, segmentation, and both recognizer paths"
      ],
      coverImage: "/projects/marks-scanner/cover.webp",
      gallaryImages: [],
      githubFrontendRepo: "https://github.com/iammahir2020/marks-upload",
      liveSite: "https://d2n2meq17rr1oi.cloudfront.net"
    },
    {
      title: "Serverless Backend-for-Frontend on AWS",
      tech: ["AWS CDK", "Lambda", "DynamoDB", "AppSync", "API Gateway", "EventBridge", "SQS", "Cognito", "React", "TypeScript"],
      description: "A hands-on BFF build on AWS: a React client stays live via GraphQL subscriptions while a decoupled event pipeline feeds the same read model, built for real production-style AWS experience.",
      longDescription: "A React + Amplify client reads orders through an API Gateway REST endpoint (Cognito-authorized) and stays live over an AppSync GraphQL subscription. A DynamoDB Streams trigger republishes every write to that subscription — a change-data-capture pattern — so the read model in DynamoDB and the live client never drift. A second, decoupled write path feeds the same table: EventBridge routes domain events to SQS (with a dead-letter queue for repeated failures), which a Lambda consumes to update DynamoDB without disturbing untouched fields.",
      features: [
        "DynamoDB Streams → AppSync GraphQL subscriptions (CDC pattern)",
        "EventBridge → SQS (with DLQ) → Lambda write path into the same read model",
        "Cognito-authorized REST API and GraphQL subscriptions on one user pool"
      ],
      coverImage: "/projects/aws-bff/architecture.svg",
      gallaryImages: [],
      githubFrontendRepo: "https://github.com/iammahir2020/bff-practice",
      liveSite: undefined
    },
    {
      title: "Battle of Polashi",
      tech: ["React.js", "TypeScript", "Socket.io", "Node.js", "Express", "MongoDB", "FireStore", "Vite"],
      description: "Real-time multiplayer social deduction board game where the server enforces every rule so clients can't force illegal moves.",
      longDescription: "A digital social deduction game with hidden-role mechanics and millisecond-perfect state synchronization. All rule validation and state transitions run server-side, reducing the client to a thin renderer, specifically to close off the kind of move-forging that's trivial to inject into a browser game through devtools on a client-trusting design.",
      features: [
        "Hidden-role mechanics and automated game-master logic",
        "Server-authoritative validation — tampered clients can't force illegal moves",
        "Multiple concurrent matches off one server process via Socket.io rooms, scoped per match",
        "Real-time state management with FireStore"
      ],
      coverImage: "/projects/polashi/polashicover.webp",
      gallaryImages: [
        "/projects/polashi/polashi3.webp",
        "/projects/polashi/polashi1.webp",
        "/projects/polashi/polashi2.webp",
      ],
      githubFrontendRepo: "https://github.com/iammahir2020/polashi_game_frontend",
      githubBackendRepo: "https://github.com/iammahir2020/polashi_game_backend",
      liveSite: "https://the-great-polashi-game.vercel.app/"
    },
    {
      title: "DSE Market Monitoring & Price Alerts",
      tech: ["Node.js", "Express", "MongoDB", "WebSockets", "Telegram Bot API", "React", "TypeScript"],
      description: "A live price-alert platform for the Dhaka Stock Exchange that notifies users the moment a stock crosses a threshold they set.",
      longDescription: "A rules engine lets each user set per-symbol price thresholds, evaluated continuously against a live price feed so a breach is caught the moment it happens rather than on the next manual check. Alerts push over two channels: Telegram via the Bot API for out-of-browser notification, and a WebSocket-backed dashboard for live in-app updates. Users and rules are modeled in MongoDB behind a Node.js and Express API, with the same service handling rule management over REST and alert delivery over WebSockets.",
      features: [
        "Per-symbol threshold rules evaluated continuously against a live feed",
        "Dual alert delivery: Telegram Bot API + WebSocket dashboard",
        "No client polling"
      ],
      coverImage: "/projects/dse-monitor/cover.webp",
      gallaryImages: [],
      githubFrontendRepo: "https://github.com/iammahir2020/dse-monitor-frontend",
      githubBackendRepo: "https://github.com/iammahir2020/dse-monitor-backend",
      liveSite: "https://dse-monitor-frontend.vercel.app"
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
      coverImage: "/projects/voter/cover.svg",
      gallaryImages: [],
      // githubFrontendRepo: "https://github.com/iammahir2020/polashi_game_frontend",
      // githubBackendRepo: "https://github.com/iammahir2020/polashi_game_backend",
      // liveSite: "https://tasnimjara.com/"
    },
    {
      title: "ZipGrip Tooling",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Stripe"],
      description: "A full e-commerce storefront with Stripe payments and separate customer and admin experiences.",
      longDescription: "Built the full purchase flow end to end — cart, checkout and order confirmation — with Stripe handling the sensitive payment step so card data never touched the app's own servers or client code. The customer-facing storefront is separated from an administrator dashboard for managing products and orders using JWT authentication and role-based access control, rather than trusting the client to hide admin-only routes.",
      features: [
        "End-to-end purchase flow: cart, checkout, order confirmation via Stripe",
        "JWT + RBAC separation between storefront and admin dashboard",
        "Admin dashboard for inventory updates and order tracking"
      ],
      coverImage: "/projects/zipgrip/cover.webp",
      gallaryImages: [],
      githubFrontendRepo: "https://github.com/iammahir2020/zipGrip-tooling-client",
      githubBackendRepo: "https://github.com/iammahir2020/zipGrip-tooling-server",
      liveSite: "https://zipgrip-tooling.web.app/"
    },
    {
      title: "Tech Archive",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Bootstrap"],
      description: "An Inventory Management System for managing items, tracking quantities, and collecting user reviews.",
      // longDescription: "Built a full-stack e-commerce platform with secure authentication, profile management, and order handling. Integrated Stripe API for secure payments.",
      features: [
        "Built CRUD functionality for item management and review system",
        "Developed user-friendly UI with responsive design for inventory tracking"
      ],
      coverImage: "/projects/tech-archive/cover.webp",
      gallaryImages: [],
      githubFrontendRepo: "https://github.com/iammahir2020/tech-archive-client",
      githubBackendRepo: "https://github.com/iammahir2020/tech-archive-server",
      liveSite: "https://tech-archive.web.app/"
    }
  ],
  education: [
    {
      degree: "MSc in Computer Science",
      institution: "Independent University, Bangladesh",
      location: "Dhaka, Bangladesh",
      period: "Expected 2027",
      keyDetails: [
        "Focusing on AI automation"
      ]
    },
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
  research: [
    {
      title: "LLM-Based Algorithm Selection for Tabular Medical Datasets",
      status: "Manuscript in preparation",
      description: "Testing whether an LLM model router reasons from dataset properties or recalls memorized benchmarks. My lane is the dataset metadata extractor, the algorithm knowledge cards, and the contamination-testing methodology; the orchestrator is the supervising faculty's work and the scoreboard a collaborator's."
    },
    {
      title: "Ethical AI in Mobile Health: A Systematic Literature Review",
      status: "Manuscript in preparation",
      description: "Co-authored review of AI accuracy, ethics and user experience in mobile health for low- and middle-income contexts, built on an annotated bibliography of 45 papers."
    }
  ],
  location: "Dhaka, Bangladesh",
  aboutMe:`I've spent close to four years building production web applications, most of it at Penta Global Limited, on national
election platforms for the Bangladesh Election Commission, a telecom roaming analytics product, and an enterprise ERP.
React, TypeScript and Node.js are where I'm strongest. Over the past year I've pushed deliberately into backend and
cloud work: FastAPI services and PostgreSQL data modelling, plus a serverless event-driven BFF on AWS I designed,
built and deployed end to end. Day to day I work in a spec-driven agentic workflow with Claude Code, authoring Skills
and MCP integrations.`
};
