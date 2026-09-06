export interface Project {
  title: string;
  tech: string[];
  description: string; // Short version for card
  longDescription?: string; // Detailed version for modal
  features?: string[];
  coverImage?: string; // Path to your screenshot
  gallaryImages?: string[]; // Path to your screenshot
  githubFrontendRepo?: string;
  githubBackendRepo?: string;
  liveSite?: string;
}

export interface SubProject {
  name: string;
  subtitle?: string;
  description: string;
  bullets: string[];
}

export interface JobHistory{
  role: string;
  period: string;
  description: string;
  keyRole: boolean;
  responsibilities: string[];
  subProjects?: SubProject[];
}
  
  export interface ExperienceItem {
    company: string;
    location: string;
    history: JobHistory[];
  }

  export interface EducationItem{
    degree: string;
    institution: string;
    location: string;
    cgpa?: string;
    period: string;
    keyDetails: string[];
  }

  export interface ResearchItem {
    title: string;
    status: string;
    description: string;
  }

  export interface ResumeData {
    name: string;
    role: string;
    email: string;
    github: string;
    linkedin: string;
    resumeLink: string;
    skills: {
      languages: string[];
      frontend: string[];
      backend: string[];
      databases: string[];
      cloud: string[];
      testing: string[];
      aiMl: string[];
      tooling: string[];
      aiAssistedDev: string[];
    };
    experience: ExperienceItem[];
    projects: Project[];
    petProjects: Project[];
    education: EducationItem[];
    research: ResearchItem[];
    location: string;
    aboutMe: string;
  }