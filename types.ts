export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  tags?: string[];
  // Enhanced fields for detailed project context
  problem?: string;
  solution?: string;
  tools?: string[];
  liveUrl?: string;
  githubUrl?: string;
  year?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price?: string;
  features?: string[];
}
