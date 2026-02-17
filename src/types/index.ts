export interface Project {
  title: string;
  tech: string[];
  description: string; // Short version for card
  longDescription?: string; // Detailed version for modal
  features?: string[];
  image?: string; // Path to your screenshot
  githubFrontendRepo?: string;
  githubBackendRepo?: string;
  liveSite?: string;
}

export interface JobHistory{
  role: string;
  period: string;
  description: string;
  keyRole: boolean;
  responsibilities: string[];
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
    cgpa: string;
    period: string;
    keyDetails: string[];
  }
  
  export interface ResumeData {
    name: string;
    role: string;
    email: string;
    github: string;
    linkedin: string;
    skills: {
      frontend: string[];
      stateManagement: string[];
      backend: string[];
      tools: string[];
    };
    experience: ExperienceItem[];
    projects: Project[];
    petProjects: Project[];
    education: EducationItem[];
    location: string;
    aboutMe: string;
  }