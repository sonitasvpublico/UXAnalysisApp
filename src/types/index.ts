export interface AnalysisResult {
  id: string;
  category: 'accessibility' | 'usability' | 'design' | 'localization';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  suggestion: string;
  impact: string;
  coordinates?: { x: number; y: number; width: number; height: number };
}

export interface LocalizationAdvice {
  market: string;
  language: string;
  suggestions: string[];
  culturalNotes: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  uploadDate: Date;
}

export type Language = 'en' | 'es' | 'fi';