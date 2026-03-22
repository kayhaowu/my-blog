export interface AboutData {
  heroName: string;
  heroNameSub: string;
  bio: string[];
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  sections: { heading: string; items: string[] }[];
}

export interface Project {
  title: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}
