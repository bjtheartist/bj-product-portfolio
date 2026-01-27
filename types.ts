export interface ProjectTool {
  name: string;
  reason: string;
}

export interface ProjectEffectiveness {
  status: 'effective' | 'partially-effective' | 'in-progress';
  description: string;
  metrics?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  tags?: string[];
  // Case Study Details
  problem?: string;
  tools?: ProjectTool[];
  effectiveness?: ProjectEffectiveness;
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
