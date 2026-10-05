export interface ProjectLink {
  title: string;
  url: string;
  description?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured: boolean;
  repoName?: string;
  language?: string;
  status?: string;
  highlights?: string[];
  overview?: string;
  behanceUrl?: string;
  figmaUrl?: string;
  figmaDeckUrl?: string;
  vimeoVideoId?: string;
  vimeoVideoIds?: string[];
  links?: ProjectLink[];
}
