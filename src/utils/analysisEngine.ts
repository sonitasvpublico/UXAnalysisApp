import type { AnalysisResult, LocalizationAdvice, Language } from '../types';

const getLocalizedAnalysisResults = (language: Language): AnalysisResult[] => {
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

const getLocalizedLocalizationAdvice = (language: Language): LocalizationAdvice[] => {
  const advice = {
    en: [
      {
        market: 'Spain',
        language: 'Spanish',
        priority: 'high' as const,
        suggestions: [
          'Text will expand 15-20% when translated - ensure adequate spacing',
          'Use formal "usted" form for professional contexts',
          'Consider Spanish color preferences (red and yellow are culturally significant)',
          'Adapt currency formats to European standards (€1.234,56)',
        ],
        culturalNotes: [
          'Spanish users prefer detailed product information',
          'Trust indicators are crucial for Spanish e-commerce',
          'Consider siesta hours for customer service availability',
        ],
      },
      {
        market: 'Mexico',
        language: 'Spanish',
        priority: 'high' as const,
        suggestions: [
          'Use Mexican Spanish variants and local terminology',
          'Adapt to Mexican peso currency format ($1,234.56)',
          'Consider mobile-first design due to high mobile usage',
          'Include local payment methods (OXXO, SPEI)',
        ],
        culturalNotes: [
          'Family-oriented messaging resonates well',
          'Bright colors are generally well-received',
          'Consider different time zones across Mexico',
        ],
      },
      {
        market: 'Finland',
        language: 'Finnish',
        priority: 'medium' as const,
        suggestions: [
          'Finnish text can be 30% longer - plan for text expansion',
          'Use Finnish date format (dd.mm.yyyy)',
          'Implement Finnish currency format (1 234,56 €)',
          'Consider Nokia design principles for familiarity',
        ],
        culturalNotes: [
          'Finns value privacy and data protection highly',
          'Minimalist design aesthetic preferred',
          'Direct, honest communication style works best',
        ],
      },
    ],
    es: [
      {
        market: 'España',
        language: 'Español',
        priority: 'high' as const,
        suggestions: [
          'El texto se expandirá 15-20% al traducirse - asegurar espaciado adecuado',
          'Usar la forma formal "usted" para contextos profesionales',
          'Considerar preferencias de color españolas (rojo y amarillo son culturalmente significativos)',
          'Adaptar formatos de moneda a estándares europeos (€1.234,56)',
        ],
        culturalNotes: [
          'Los usuarios españoles prefieren información detallada del producto',
          'Los indicadores de confianza son cruciales para el comercio electrónico español',
          'Considerar las horas de siesta para disponibilidad de atención al cliente',
        ],
      },
      {
        market: 'México',
        language: 'Español',
        priority: 'high' as const,
        suggestions: [
          'Usar variantes del español mexicano y terminología local',
          'Adaptar al formato de peso mexicano ($1,234.56)',
          'Considerar diseño móvil primero debido al alto uso móvil',
          'Incluir métodos de pago locales (OXXO, SPEI)',
        ],
        culturalNotes: [
          'Los mensajes orientados a la familia resuenan bien',
          'Los colores brillantes son generalmente bien recibidos',
          'Considerar diferentes zonas horarias en México',
        ],
      },
      {
        market: 'Finlandia',
        language: 'Finlandés',
        priority: 'medium' as const,
        suggestions: [
          'El texto finlandés puede ser 30% más largo - planificar para expansión de texto',
          'Usar formato de fecha finlandés (dd.mm.yyyy)',
          'Implementar formato de moneda finlandés (1 234,56 €)',
          'Considerar principios de diseño Nokia para familiaridad',
        ],
        culturalNotes: [
          'Los finlandeses valoran altamente la privacidad y protección de datos',
          'Se prefiere estética de diseño minimalista',
          'El estilo de comunicación directo y honesto funciona mejor',
        ],
      },
    ],
    fi: [
      {
        market: 'Espanja',
        language: 'Espanja',
        priority: 'high' as const,
        suggestions: [
          'Teksti laajenee 15-20% käännettäessä - varmista riittävä välistys',
          'Käytä muodollista "usted" -muotoa ammatillisissa yhteyksissä',
          'Harkitse espanjalaisia värimieltymyksiä (punainen ja keltainen ovat kulttuurisesti merkittäviä)',
          'Mukaudu eurooppalaisiin valuuttaformaatteihin (€1.234,56)',
        ],
        culturalNotes: [
          'Espanjalaiset käyttäjät suosivat yksityiskohtaisia tuotetietoja',
          'Luottamusindikaattorit ovat ratkaisevia espanjalaisessa verkkokaupassa',
          'Harkitse siesta-aikoja asiakaspalvelun saatavuudessa',
        ],
      },
      {
        market: 'Meksiko',
        language: 'Espanja',
        priority: 'high' as const,
        suggestions: [
          'Käytä meksikolaisia espanjan variantteja ja paikallista terminologiaa',
          'Mukaudu Meksikon peso-valuuttaformaattiin ($1,234.56)',
          'Harkitse mobiili-ensisijaista suunnittelua korkean mobiilikäytön vuoksi',
          'Sisällytä paikalliset maksutavat (OXXO, SPEI)',
        ],
        culturalNotes: [
          'Perhekeskeiset viestit resonoivat hyvin',
          'Kirkkaat värit ovat yleensä hyvin vastaanotettuja',
          'Harkitse eri aikavyöhykkeitä Meksikossa',
        ],
      },
      {
        market: 'Suomi',
        language: 'Suomi',
        priority: 'medium' as const,
        suggestions: [
          'Suomalainen teksti voi olla 30% pidempi - suunnittele tekstin laajentumista varten',
          'Käytä suomalaista päivämääräformaattia (dd.mm.yyyy)',
          'Toteuta suomalainen valuuttaformaatti (1 234,56 €)',
          'Harkitse Nokia-suunnitteluperiaatteita tuttuuden vuoksi',
        ],
        culturalNotes: [
          'Suomalaiset arvostavat yksityisyyttä ja tietosuojaa korkeasti',
          'Minimalistista suunnitteluestetiikkaa suositaan',
          'Suora, rehellinen viestintätyyli toimii parhaiten',
        ],
      },
    ],
  };

  return advice[language] || advice.en;
};

export const analyzeImage = async (imageUrl: string, language: Language = 'en'): Promise<{
  results: AnalysisResult[];
  localizationAdvice: LocalizationAdvice[];
}> => {
  // Simulate AI analysis delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const results = getLocalizedAnalysisResults(language);
  const localizationAdvice = getLocalizedLocalizationAdvice(language);

  return { results, localizationAdvice };
};

export const exportAnalysisReport = (
  results: AnalysisResult[],
  localizationAdvice: LocalizationAdvice[],
  imageName: string
): void => {
  const report = {
    timestamp: new Date().toISOString(),
    imageName,
    summary: {
      totalIssues: results.length,
      criticalIssues: results.filter(r => r.severity === 'critical').length,
      highPriorityIssues: results.filter(r => r.severity === 'high').length,
    },
    analysisResults: results,
    localizationAdvice,
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: 'application/json',
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ui-analysis-report-${imageName}-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};