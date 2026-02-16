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
  
  export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    description: string;
  }

  export interface EducationItem{
    degree: string;
    institution: string;
    cgpa: string;
    year: string;
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
    education: EducationItem;
    location: string;
  }