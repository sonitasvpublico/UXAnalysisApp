export type Language = 'en' | 'es' | 'fi';

export interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  uploadDate: Date;
}

export interface AIDetectionResult {
  description: string;
  score?: number;
  boundingPoly?: {
    vertices: Array<{
      x: number;
      y: number;
    }>;
  };
  name?: string;
}

export interface AnalysisResult {
  id: string;
  category: 'accessibility' | 'usability' | 'design';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  suggestion: string;
  impact: string;
  coordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface VisionAPIResponse {
  labelAnnotations?: AIDetectionResult[];
  textAnnotations?: AIDetectionResult[];
  logoAnnotations?: AIDetectionResult[];
}

export interface LocalizationAdvice {
  id: string;
  title: string;
  description: string;
  advice: string;
  category: 'format' | 'tone' | 'general';
}