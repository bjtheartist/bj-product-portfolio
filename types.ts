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

export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface DiagnosticFormData {
  type: 'diagnostic';
  email: string;
  url: string;
}

export interface IntakeFormData {
  type: 'intake';
  name: string;
  email: string;
  phone: string;
  business: string;
  industry: string;
  url: string;
  budget: string;
  timeline: string;
  message: string;
}
