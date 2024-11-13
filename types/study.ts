export interface StudyMaterial {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'document' | 'video';
  summary?: string;
  keyPoints?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StudySession {
  id: string;
  materialId: string;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
}