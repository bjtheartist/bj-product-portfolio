
export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price?: string;
}
