import type { AnalysisResult, LocalizationAdvice, Language } from '../types';
import { localizationRules } from './localizationRules';
import { getTranslation } from './translations';

export const getLocalizedAnalysisResults = (language: Language): AnalysisResult[] => {
  const results = {
    en: [
      {
        id: '1',
        category: 'accessibility' as const,
        severity: 'critical' as const,
        title: 'Low Color Contrast',
        description: 'Text elements have insufficient color contrast ratio (2.1:1) against the background.',
        suggestion: 'Increase contrast to at least 4.5:1 for normal text or 3:1 for large text to meet WCAG AA standards.',
        impact: 'Users with visual impairments may have difficulty reading content.',
        coordinates: { x: 150, y: 200, width: 300, height: 50 },
      },
      {
        id: '2',
        category: 'usability' as const,
        severity: 'high' as const,
        title: 'Small Touch Targets',
        description: 'Interactive elements are smaller than the recommended 44x44px minimum touch target size.',
        suggestion: 'Increase button and link sizes to at least 44x44px for better mobile usability.',
        impact: 'Difficult navigation on mobile devices, especially for users with motor impairments.',
        coordinates: { x: 200, y: 350, width: 120, height: 32 },
      },
      {
        id: '3',
        category: 'design' as const,
        severity: 'medium' as const,
        title: 'Inconsistent Typography',
        description: 'Multiple font families and inconsistent font sizes create visual hierarchy issues.',
        suggestion: 'Establish a consistent typography scale with 2-3 font families maximum.',
        impact: 'Reduced readability and professional appearance.',
      },
      {
        id: '4',
        category: 'accessibility' as const,
        severity: 'high' as const,
        title: 'Missing Alternative Text',
        description: 'Images lack descriptive alt text for screen readers.',
        suggestion: 'Add meaningful alt text descriptions for all informative images.',
        impact: 'Screen reader users cannot access image content.',
      },
      {
        id: '5',
        category: 'usability' as const,
        severity: 'medium' as const,
        title: 'Complex Navigation Flow',
        description: 'The current navigation requires too many clicks to reach important content.',
        suggestion: 'Simplify navigation hierarchy and provide quick access to key features.',
        impact: 'Increased user frustration and higher bounce rates.',
      },
      {
        id: '6',
        category: 'design' as const,
        severity: 'low' as const,
        title: 'Excessive White Space',
        description: 'Some sections have too much white space, making the layout feel empty.',
        suggestion: 'Balance white space usage and consider adding supportive content or visual elements.',
        impact: 'Suboptimal use of screen real estate.',
      },
    ],
    es: [
      {
        id: '1',
        category: 'accessibility' as const,
        severity: 'critical' as const,
        title: 'Contraste de Color Bajo',
        description: 'Los elementos de texto tienen una relación de contraste de color insuficiente (2.1:1) contra el fondo.',
        suggestion: 'Aumentar el contraste a al menos 4.5:1 para texto normal o 3:1 para texto grande para cumplir con los estándares WCAG AA.',
        impact: 'Los usuarios con discapacidades visuales pueden tener dificultades para leer el contenido.',
        coordinates: { x: 150, y: 200, width: 300, height: 50 },
      },
      {
        id: '2',
        category: 'usability' as const,
        severity: 'high' as const,
        title: 'Objetivos Táctiles Pequeños',
        description: 'Los elementos interactivos son más pequeños que el tamaño mínimo recomendado de 44x44px.',
        suggestion: 'Aumentar el tamaño de botones y enlaces a al menos 44x44px para mejor usabilidad móvil.',
        impact: 'Navegación difícil en dispositivos móviles, especialmente para usuarios con discapacidades motoras.',
        coordinates: { x: 200, y: 350, width: 120, height: 32 },
      },
      {
        id: '3',
        category: 'design' as const,
        severity: 'medium' as const,
        title: 'Tipografía Inconsistente',
        description: 'Múltiples familias de fuentes y tamaños inconsistentes crean problemas de jerarquía visual.',
        suggestion: 'Establecer una escala tipográfica consistente con máximo 2-3 familias de fuentes.',
        impact: 'Reducida legibilidad y apariencia profesional.',
      },
      {
        id: '4',
        category: 'accessibility' as const,
        severity: 'high' as const,
        title: 'Texto Alternativo Faltante',
        description: 'Las imágenes carecen de texto alternativo descriptivo para lectores de pantalla.',
        suggestion: 'Agregar descripciones de texto alternativo significativas para todas las imágenes informativas.',
        impact: 'Los usuarios de lectores de pantalla no pueden acceder al contenido de las imágenes.',
      },
      {
        id: '5',
        category: 'usability' as const,
        severity: 'medium' as const,
        title: 'Flujo de Navegación Complejo',
        description: 'La navegación actual requiere demasiados clics para llegar al contenido importante.',
        suggestion: 'Simplificar la jerarquía de navegación y proporcionar acceso rápido a características clave.',
        impact: 'Mayor frustración del usuario y tasas de rebote más altas.',
      },
      {
        id: '6',
        category: 'design' as const,
        severity: 'low' as const,
        title: 'Espacio en Blanco Excesivo',
        description: 'Algunas secciones tienen demasiado espacio en blanco, haciendo que el diseño se sienta vacío.',
        suggestion: 'Equilibrar el uso del espacio en blanco y considerar agregar contenido de apoyo o elementos visuales.',
        impact: 'Uso subóptimo del espacio de pantalla.',
      },
    ],
    fi: [
      {
        id: '1',
        category: 'accessibility' as const,
        severity: 'critical' as const,
        title: 'Matala Värikontrasti',
        description: 'Tekstielementeillä on riittämätön värikontrastisuhde (2.1:1) taustaan nähden.',
        suggestion: 'Lisää kontrastia vähintään 4.5:1 normaalille tekstille tai 3:1 suurelle tekstille WCAG AA -standardien mukaisesti.',
        impact: 'Näkövammaisilla käyttäjillä voi olla vaikeuksia lukea sisältöä.',
        coordinates: { x: 150, y: 200, width: 300, height: 50 },
      },
      {
        id: '2',
        category: 'usability' as const,
        severity: 'high' as const,
        title: 'Pienet Kosketuskohteet',
        description: 'Interaktiiviset elementit ovat pienempiä kuin suositeltu 44x44px vähimmäiskosketuskohteen koko.',
        suggestion: 'Suurenna painikkeiden ja linkkien kokoa vähintään 44x44px parempaa mobiilikäytettävyyttä varten.',
        impact: 'Vaikea navigointi mobiililaitteilla, erityisesti motorisista vammoista kärsiville käyttäjille.',
        coordinates: { x: 200, y: 350, width: 120, height: 32 },
      },
      {
        id: '3',
        category: 'design' as const,
        severity: 'medium' as const,
        title: 'Epäjohdonmukainen Typografia',
        description: 'Useita fonttiperheitä ja epäjohdonmukaiset fonttikoot luovat visuaalisen hierarkian ongelmia.',
        suggestion: 'Luo johdonmukainen typografinen asteikko maksimissaan 2-3 fonttiperheellä.',
        impact: 'Heikentynyt luettavuus ja ammattimainen ulkoasu.',
      },
      {
        id: '4',
        category: 'accessibility' as const,
        severity: 'high' as const,
        title: 'Puuttuva Vaihtoehtoinen Teksti',
        description: 'Kuvista puuttuu kuvaava vaihtoehtoinen teksti ruudunlukijoille.',
        suggestion: 'Lisää merkityksellisiä vaihtoehtoisia tekstikuvauksia kaikille informatiivisille kuville.',
        impact: 'Ruudunlukijan käyttäjät eivät voi käyttää kuvasisältöä.',
      },
      {
        id: '5',
        category: 'usability' as const,
        severity: 'medium' as const,
        title: 'Monimutkainen Navigointivirta',
        description: 'Nykyinen navigointi vaatii liian monta napsautusta tärkeän sisällön saavuttamiseksi.',
        suggestion: 'Yksinkertaista navigointihierarkiaa ja tarjoa nopea pääsy avainominaisuuksiin.',
        impact: 'Lisääntynyt käyttäjien turhautuminen ja korkeammat poistumisprosentit.',
      },
      {
        id: '6',
        category: 'design' as const,
        severity: 'low' as const,
        title: 'Liiallinen Tyhjä Tila',
        description: 'Joissakin osioissa on liikaa tyhjää tilaa, mikä saa asettelun tuntumaan tyhjältä.',
        suggestion: 'Tasapainota tyhjän tilan käyttöä ja harkitse tukisisällön tai visuaalisten elementtien lisäämistä.',
        impact: 'Näyttötilan alioptimaalinen käyttö.',
      },
    ],
  };

  return results[language] || results.en;
};

// Esta función ahora será dinámica y usará las reglas
const getDynamicLocalizationAdvice = (language: Language, countryCode: string): LocalizationAdvice[] => {
  const rules = localizationRules[countryCode]?.rules;
  const countryName = localizationRules[countryCode]?.countryName[language] || localizationRules[countryCode]?.countryName.en;

  if (!rules) {
    return [{
      id: 'no-rules',
      title: 'No Specific Rules',
      description: `No specific localization rules were found for ${countryName}. Using general best practices.`,
      advice: `No specific localization rules found for ${countryName}.`,
      category: 'general'
    }];
  }

  const advice: LocalizationAdvice[] = [];

  if (rules.dateFormat) {
    advice.push({
      id: 'date',
      title: language === 'es' ? 'Formatos y Estándares' : language === 'fi' ? 'Formaatit ja Standardit' : 'Formatting & Standards',
      description: language === 'es' ? 'Asegúrate de que las fechas sigan el formato local para evitar confusiones.' : language === 'fi' ? 'Varmista, että päivämäärät noudattavat paikallista standardia.' : 'Ensure dates follow the local standard to avoid confusion.',
      advice: rules.dateFormat[language] || rules.dateFormat.en,
      category: 'format'
    });
  }
  if (rules.currency) {
    advice.push({
      id: 'currency',
      title: language === 'es' ? 'Formatos y Estándares' : language === 'fi' ? 'Formaatit ja Standardit' : 'Formatting & Standards',
      description: language === 'es' ? 'Muestra precios y valores monetarios en la moneda y formato local.' : language === 'fi' ? 'Näytä hinnat ja rahamäärät paikallisessa valuutassa ja muodossa.' : 'Display prices and monetary values in the local currency and format.',
      advice: rules.currency[language] || rules.currency.en,
      category: 'format'
    });
  }
  if (rules.formality) {
    advice.push({
      id: 'formality',
      title: language === 'es' ? 'Tono y Formalidad' : language === 'fi' ? 'Sävy ja Muodollisuus' : 'Tone & Formality',
      description: language === 'es' ? 'Ajusta el estilo de comunicación según las normas culturales locales de formalidad.' : language === 'fi' ? 'Säädä viestintätyyliä paikallisten muodollisuusnormien mukaan.' : 'Adjust the communication style to match local cultural norms of formality.',
      advice: rules.formality[language] || rules.formality.en,
      category: 'tone'
    });
  }

  if (advice.length === 0) {
    return [{
      id: 'all-good',
      title: 'Localization Looks Good',
      description: `No specific localization advice for ${countryName}. The current setup seems appropriate.`,
      advice: `No specific localization advice for ${countryName}. Looks good!`,
      category: 'general'
    }];
  }

  return advice;
};

const analyzeTextForLocalizationIssues = (
  text: string,
  countryCode: string,
  language: Language
): LocalizationAdvice[] => {
  const issues: LocalizationAdvice[] = [];
  const countryRules = localizationRules[countryCode]?.rules;

  if (!countryRules || !text) {
    return issues;
  }

  const t = (key: string, vars: Record<string, any> = {}) => {
    let str = getTranslation(language, `aiAnalysis.localization.${key}`);
     if (!str || str.startsWith('aiAnalysis.')) str = getTranslation('en', `aiAnalysis.localization.${key}`);
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    });
    return str;
  };

  // 1. Verificación de Moneda
  if (text.includes('$') && countryRules.currency && !countryRules.currency.en.includes('$')) {
    issues.push({
      id: 'dynamic-currency',
      category: 'format',
      title: t('currencyTitle'),
      description: t('currencyDesc', { symbol: '$' }),
      advice: countryRules.currency[language] || countryRules.currency.en,
    });
  }

  // 2. Verificación de formato de fecha (MM/DD/YYYY)
  const usDateRegex = /\b(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{2,4}\b/;
  if (usDateRegex.test(text) && countryRules.dateFormat && !countryRules.dateFormat.en.includes('MM/DD/YYYY')) {
    issues.push({
      id: 'dynamic-date',
      category: 'format',
      title: t('dateTitle'),
      description: t('dateDesc', { format: 'MM/DD/YYYY' }),
      advice: countryRules.dateFormat[language] || countryRules.dateFormat.en,
    });
  }

  return issues;
};

// La función principal que se llama desde App.tsx
export const analyzeImage = async (
  language: Language,
  targetCountry: string,
  aiResults?: any
): Promise<{
  analysis: AnalysisResult[];
  localization: LocalizationAdvice[];
}> => {
  // Simula una llamada a la API que podría fallar o tardar
  await new Promise(resolve => setTimeout(resolve, 500)); 

  const analysisResults = getLocalizedAnalysisResults(language);
  const generalAdvice = getDynamicLocalizationAdvice(language, targetCountry);
  
  const fullText = aiResults?.responses?.[0]?.textAnnotations?.[0]?.description || '';
  const intelligentAdvice = analyzeTextForLocalizationIssues(fullText, targetCountry, language);

  // Combinar y eliminar duplicados (si un consejo general ya cubre uno inteligente)
  const combinedAdvice = [...intelligentAdvice, ...generalAdvice];
  const uniqueAdvice = combinedAdvice.filter((advice, index, self) =>
    index === self.findIndex((a) => a.id === advice.id)
  );

  return {
    analysis: analysisResults,
    localization: uniqueAdvice,
  };
};

// Nueva función específica para obtener solo consejos de localización
export const getLocalizationAdviceOnly = (
  language: Language,
  targetCountry: string,
  aiResults?: any
): LocalizationAdvice[] => {
  const generalAdvice = getDynamicLocalizationAdvice(language, targetCountry);
  
  const fullText = aiResults?.responses?.[0]?.textAnnotations?.[0]?.description || '';
  const intelligentAdvice = analyzeTextForLocalizationIssues(fullText, targetCountry, language);

  // Combinar y eliminar duplicados (si un consejo general ya cubre uno inteligente)
  const combinedAdvice = [...intelligentAdvice, ...generalAdvice];
  const uniqueAdvice = combinedAdvice.filter((advice, index, self) =>
    index === self.findIndex((a) => a.id === advice.id)
  );

  return uniqueAdvice;
};

export async function analyzeImageWithVisionAPI(base64Image: string): Promise<any> {
  const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
  const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  if (!apiKey || apiKey === 'TU_API_key_AQUI') {
    console.warn('Google Vision API key is not set. Using fallback analysis.');
    // Devolver un objeto vacío para que el flujo principal sepa que debe usar el fallback.
    return {};
  }

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    requests: [
      {
            image: {
              content: base64Image,
            },
            features: [
              { type: 'TEXT_DETECTION', maxResults: 10 },
              { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
              { type: 'LABEL_DETECTION', maxResults: 10 },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Google Vision API request failed:', errorBody);
      throw new Error(`API Error: ${errorBody.error?.message || response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error calling Google Vision API:', error);
    // Re-lanzar el error para que el componente que llama (FileUpload) pueda manejarlo.
    throw error;
  }
}

/**
 * Genera issues reales a partir de los resultados de la IA de Google Vision
 * @param aiResults { labelAnnotations, localizedObjectAnnotations, textAnnotations }
 * @param imageWidth ancho de la imagen (opcional)
 * @param imageHeight alto de la imagen (opcional)
 * @param language idioma actual
 * @returns AnalysisResult[]
 */
export function generateAnalysisResultsFromAI(aiResults: any, imageWidth?: number, imageHeight?: number, language: Language = 'en'): AnalysisResult[] {
  const results: AnalysisResult[] = [];
  let idCounter = 1;
  const t = (key: string, vars: Record<string, any> = {}) => {
    let str = getTranslation(language, key);
    if (!str || str === key) {
      // Fallback a inglés si no existe en el idioma actual
      str = getTranslation('en', key);
    }
    if (!str || str === key) return '';
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    });
    return str;
  };

  // 0. Baja resolución
  if (imageWidth && imageHeight && (imageWidth < 400 || imageHeight < 400)) {
    results.push({
      id: `ai-${idCounter++}`,
      category: 'design',
      severity: 'high',
      title: t('aiAnalysis.lowResTitle'),
      description: t('aiAnalysis.lowResDesc', { width: imageWidth, height: imageHeight }),
      suggestion: t('aiAnalysis.lowResSuggestion'),
      impact: t('aiAnalysis.lowResImpact')
    });
  }

  // 1. Si hay texto detectado, issue de accesibilidad (más específico)
  if (aiResults.textAnnotations && aiResults.textAnnotations.length > 0) {
    const mainText = aiResults.textAnnotations[0]?.description?.trim();
    const topWords = aiResults.textAnnotations.slice(1, 4).map((t: any) => t.description).filter(Boolean);
    const vertices = aiResults.textAnnotations[1]?.boundingPoly?.vertices;
    let box = undefined;
    let boxStr = '';
    if (vertices && vertices.length >= 4) {
      const xs = vertices.map((v: any) => v.x || 0);
      const ys = vertices.map((v: any) => v.y || 0);
      const x = Math.min(...xs);
      const y = Math.min(...ys);
      const width = Math.max(...xs) - x;
      const height = Math.max(...ys) - y;
      box = { x, y, width, height };
      boxStr = t('aiAnalysis.textBox', { width, height });
    }
    const keyWordsStr = topWords.length ? t('aiAnalysis.textKeyWords', { words: topWords.join(', ') }) : '';
    results.push({
      id: `ai-${idCounter++}`,
      category: 'accessibility',
      severity: 'high',
      title: t('aiAnalysis.textTitle'),
      description: t('aiAnalysis.textDesc', { mainText: mainText?.replace(/\n/g, ' '), keyWords: keyWordsStr, box: boxStr }),
      suggestion: t('aiAnalysis.textSuggestion'),
      impact: t('aiAnalysis.textImpact'),
      ...(box ? { coordinates: box } : {})
    });
  }

  // 2. Si hay personas detectadas, issue de privacidad
  if (aiResults.labelAnnotations && aiResults.labelAnnotations.some((l: any) => l.description.toLowerCase().includes('person'))) {
    results.push({
      id: `ai-${idCounter++}`,
      category: 'usability',
      severity: 'medium',
      title: t('aiAnalysis.personTitle'),
      description: t('aiAnalysis.personDesc'),
      suggestion: t('aiAnalysis.personSuggestion'),
      impact: t('aiAnalysis.personImpact'),
    });
  }

  // 3. Si hay más de 1 objeto igual, issue de usabilidad
  if (aiResults.localizedObjectAnnotations && aiResults.localizedObjectAnnotations.length > 0) {
    const objectCounts: Record<string, number> = {};
    aiResults.localizedObjectAnnotations.forEach((obj: any) => {
      const name = obj.name || obj.description || 'Object';
      objectCounts[name] = (objectCounts[name] || 0) + 1;
    });
    Object.entries(objectCounts).forEach(([name, count]) => {
      if (count > 1) {
        results.push({
          id: `ai-${idCounter++}`,
          category: 'usability',
          severity: 'low',
          title: t('aiAnalysis.multiObjTitle', { name }),
          description: t('aiAnalysis.multiObjDesc', { name, count }),
          suggestion: t('aiAnalysis.multiObjSuggestion'),
          impact: t('aiAnalysis.multiObjImpact'),
        });
  }
    });
  }

  // 4. Si hay muchos labels, issue de complejidad visual
  if (aiResults.labelAnnotations && aiResults.labelAnnotations.length > 5) {
    const labelNames = aiResults.labelAnnotations.map((l: any) => l.description).join(', ');
    results.push({
      id: `ai-${idCounter++}`,
      category: 'design',
      severity: 'medium',
      title: t('aiAnalysis.visualComplexityTitle'),
      description: t('aiAnalysis.visualComplexityDesc', { labels: labelNames }),
      suggestion: t('aiAnalysis.visualComplexitySuggestion'),
      impact: t('aiAnalysis.visualComplexityImpact'),
    });
  }

  return results;
}