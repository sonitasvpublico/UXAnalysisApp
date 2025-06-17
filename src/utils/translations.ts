import type { Language } from '../types';

export const translations = {
  en: {
    title: 'UI/UX Analysis Tool',
    subtitle: 'Professional design analysis and localization recommendations',
    uploadTitle: 'Upload Your Design',
    uploadDescription: 'Drag and drop your screenshot or UI design to get started with AI-powered analysis',
    uploadButton: 'Choose File',
    dragText: 'Drag your image here',
    orText: 'or',
    analyzing: 'Analyzing your design...',
    results: 'Analysis Results',
    suggestions: 'Improvement Suggestions',
    localization: 'Localization Advice',
    exportReport: 'Export Report',
    newAnalysis: 'New Analysis',
    severity: {
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    categories: {
      accessibility: 'Accessibility',
      usability: 'Usability',
      design: 'Design',
      localization: 'Localization',
    },
    markets: {
      spain: 'Spain',
      mexico: 'Mexico',
      finland: 'Finland',
    },
    languages: {
      en: 'English',
      es: 'Spanish',
      fi: 'Finnish',
    },
  },
  es: {
    title: 'Herramienta de Análisis UI/UX',
    subtitle: 'Análisis profesional de diseño y recomendaciones de localización',
    uploadTitle: 'Sube tu Diseño',
    uploadDescription: 'Arrastra y suelta tu captura de pantalla o diseño UI para comenzar el análisis con IA',
    uploadButton: 'Elegir Archivo',
    dragText: 'Arrastra tu imagen aquí',
    orText: 'o',
    analyzing: 'Analizando tu diseño...',
    results: 'Resultados del Análisis',
    suggestions: 'Sugerencias de Mejora',
    localization: 'Consejos de Localización',
    exportReport: 'Exportar Informe',
    newAnalysis: 'Nuevo Análisis',
    severity: {
      critical: 'Crítico',
      high: 'Alto',
      medium: 'Medio',
      low: 'Bajo',
    },
    categories: {
      accessibility: 'Accesibilidad',
      usability: 'Usabilidad',
      design: 'Diseño',
      localization: 'Localización',
    },
    markets: {
      spain: 'España',
      mexico: 'México',
      finland: 'Finlandia',
    },
    languages: {
      en: 'Inglés',
      es: 'Español',
      fi: 'Finlandés',
    },
  },
  fi: {
    title: 'UI/UX Analysointityökalu',
    subtitle: 'Ammattimainen suunnitteluanalyysi ja lokalisointisuositukset',
    uploadTitle: 'Lataa Suunnitelmasi',
    uploadDescription: 'Vedä ja pudota kuvakaappauksesi tai käyttöliittymäsuunnitelmasi aloittaaksesi AI-pohjaisen analyysin',
    uploadButton: 'Valitse Tiedosto',
    dragText: 'Vedä kuvasi tähän',
    orText: 'tai',
    analyzing: 'Analysoidaan suunnitteluasi...',
    results: 'Analyysitulokset',
    suggestions: 'Parannusehdotukset',
    localization: 'Lokalisointineuvot',
    exportReport: 'Vie Raportti',
    newAnalysis: 'Uusi Analyysi',
    severity: {
      critical: 'Kriittinen',
      high: 'Korkea',
      medium: 'Keskitaso',
      low: 'Matala',
    },
    categories: {
      accessibility: 'Saavutettavuus',
      usability: 'Käytettävyys',
      design: 'Suunnittelu',
      localization: 'Lokalisointi',
    },
    markets: {
      spain: 'Espanja',
      mexico: 'Meksiko',
      finland: 'Suomi',
    },
    languages: {
      en: 'Englanti',
      es: 'Espanja',
      fi: 'Suomi',
    },
  },
};

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};