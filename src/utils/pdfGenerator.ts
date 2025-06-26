import jsPDF from 'jspdf';
import type { AnalysisResult, LocalizationAdvice, Language } from '../types';
import { getTranslation } from './translations';

// --- Font Loading Helper ---
// Fetches a font file and returns it as a base64 string for jsPDF.
const getFontAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch font: ${url}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                // The result is a data URL (e.g., "data:font/ttf;base64,..."). We need only the base64 part.
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error('Failed to read font file.'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
// --- End Helper ---

interface PDFReportData {
  results: AnalysisResult[];
  localizationAdvice: LocalizationAdvice[];
  imageName: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
  currentLanguage: Language;
  targetCountry: string;
  aiResults?: any;
}

// Estilos y espaciados profesionales
const styles = {
  colors: {
    primary: '#4F46E5',
    critical: '#EF4444',
    high: '#F59E0B',
    medium: '#3B82F6',
    low: '#10B981',
    text: '#1F2937',
    textLight: '#6B7280',
    border: '#E5E7EB'
  },
  fontSize: {
    h1: 22,
    h2: 18,
    h3: 16,
    item: 14,
    body: 11,
    small: 9
  },
  spacing: {
    margin: 32, // margen amplio en todos los lados
    marginTop: 50, // Margen superior específico
    section: 24, // entre secciones de color
    title_to_list: 14, // entre título y primer ítem
    between_items: 9, // entre ítems
    indent: 24, // sangría real
    lineHeight: 1.35
  }
};

// Emojis for categories and severity
const categoryEmojis = {
  accessibility: '♿️',
  usability: '👆',
  design: '🎨',
  localization: '🌍',
  general: '📋'
};

const severityEmojis = {
  critical: '🔴',
  high: '🟠',
  medium: '🟡',
  low: '🟢'
};

export const generateBeautifulPDF = async (data: PDFReportData): Promise<void> => {
  try {
    const { results, localizationAdvice, imageName, targetCountry, imageUrl, imageDimensions, currentLanguage } = data;
    
    const pdf = new jsPDF('p', 'pt', 'a4'); // Using points for more control
    
    // --- Load Fonts into PDF ---
    const poppinsRegularBase64 = await getFontAsBase64('/src/assets/fonts/Poppins-Regular.ttf');
    const poppinsBoldBase64 = await getFontAsBase64('/src/assets/fonts/Poppins-Bold.ttf');

    pdf.addFileToVFS('Poppins-Regular.ttf', poppinsRegularBase64);
    pdf.addFont('Poppins-Regular.ttf', 'Poppins', 'normal');

    pdf.addFileToVFS('Poppins-Bold.ttf', poppinsBoldBase64);
    pdf.addFont('Poppins-Bold.ttf', 'Poppins', 'bold');
    // --- End Font Loading ---

    pdf.setFont('Poppins', 'normal');
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = styles.spacing.margin;
    const contentWidth = pageWidth - (margin * 2);
    let y = styles.spacing.marginTop;

    const t = (key: string) => getTranslation(currentLanguage, key);

    const addWrappedText = (text: string, x: number, currentY: number, maxWidth: number, options: { fontSize?: number; fontStyle?: 'normal' | 'bold'; color?: string; align?: 'left' | 'center' | 'right' } = {}) => {
      const { fontSize = styles.fontSize.body, fontStyle = 'normal', color = styles.colors.text, align = 'left' } = options;
      const lineHeight = 1.4; // Consistent line height

      pdf.setFont('Poppins', fontStyle);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(color);
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      const textBlockHeight = lines.length * fontSize * lineHeight;
      
      checkPageBreak(textBlockHeight);

      pdf.text(lines, x, currentY, { align, lineHeightFactor: lineHeight });
      
      return currentY + textBlockHeight - (fontSize * (lineHeight - 1)); // Return the precise position for the next element
    };

    const checkPageBreak = (neededSpace: number) => {
      if (y + neededSpace > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        y = styles.spacing.marginTop;
      }
    };
    
    const addDecorativeLine = (currentY: number) => {
      checkPageBreak(15);
      pdf.setDrawColor(styles.colors.border);
      pdf.setLineWidth(0.5);
      pdf.line(margin, currentY, pageWidth - margin, currentY);
      return currentY + 15;
    };

    // --- PAGE 1: Project Details & Screenshot ---
    const section1StartY = y;
    let textY = section1StartY;
    let imageY = section1StartY;

    // --- Left Column (Project Details)
    const leftColumnX = margin;
    const leftColumnWidth = contentWidth * 0.55;
    
    textY = addWrappedText('Project Details', leftColumnX, textY, leftColumnWidth, { fontStyle: 'bold', fontSize: styles.fontSize.h2, color: styles.colors.text }); // Black title
    textY += 15;

    const addDetail = (label: string, value: string, currentY: number) => {
        const labelWidth = pdf.getStringUnitWidth(label + ':') * styles.fontSize.body + 5;
        
        pdf.setFont('Poppins', 'bold');
        pdf.setFontSize(styles.fontSize.body);
        pdf.text(`${label}:`, leftColumnX, currentY);

        pdf.setFont('Poppins', 'normal');
        const valueY = addWrappedText(value, leftColumnX + labelWidth, currentY, leftColumnWidth - labelWidth, { fontStyle: 'normal' });
        return Math.max(currentY + styles.fontSize.body + 12, valueY + 12); // Increased spacing
    };
    
    textY = addDetail('Screenshot', imageName, textY);
    textY = addDetail('Target', targetCountry, textY);
    textY = addDetail('Issues Found', String(results.length), textY);
    
    // --- Right Column (Screenshot)
    let imgHeight = 0;
    if (imageUrl && imageDimensions) {
        const rightColumnX = margin + leftColumnWidth + (contentWidth * 0.05);
        const rightColumnWidth = contentWidth * 0.40;
        const aspectRatio = imageDimensions.width / imageDimensions.height;
        imgHeight = rightColumnWidth / aspectRatio;
        
        checkPageBreak(imgHeight);
        pdf.addImage(imageUrl, 'PNG', rightColumnX, imageY, rightColumnWidth, imgHeight);
    }

    y = Math.max(textY, imageY + imgHeight) + styles.spacing.section;

    // --- PAGE 2: Analysis Results ---
    pdf.addPage();
    y = styles.spacing.marginTop; // Reset Y for new page

    if (results.length > 0) {
      y = addWrappedText(t('suggestions'), margin, y, contentWidth, { fontStyle: 'bold', fontSize: styles.fontSize.h2, color: styles.colors.text }); // Black title
      y += styles.spacing.title_to_list;

      const severityOrder = ['critical', 'high', 'medium', 'low'] as const;
      for (const severity of severityOrder) {
        const issuesOfSeverity = results.filter(r => r.severity === severity);
        if (issuesOfSeverity.length > 0) {
          checkPageBreak(styles.fontSize.h2 * 2);
          
          const severityTitle = `${severityEmojis[severity]} ${severity.charAt(0).toUpperCase() + severity.slice(1)} (${issuesOfSeverity.length})`;
          y = addWrappedText(severityTitle, margin, y, contentWidth, { fontStyle: 'bold', fontSize: styles.fontSize.h2, color: styles.colors[severity] });
          y += 12;

          for (const issue of issuesOfSeverity) {
            checkPageBreak(90); // Estimate space for an issue
            
            const titleText = `${categoryEmojis[issue.category]} ${issue.title}`;
            y = addWrappedText(titleText, margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent, { fontSize: styles.fontSize.item, fontStyle: 'bold' });
            y += 6;

            y = addWrappedText(`Description: ${issue.description}`, margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent, { color: styles.colors.textLight });
            y += 6;
            
            y = addWrappedText(`Suggestion: ${issue.suggestion}`, margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent);
            y += 8;

            if (issue.impact) {
                const impactText = `Impact: ${issue.impact}`;
                y = addWrappedText(impactText, margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent);
            }
            y += styles.spacing.section; // More space between issues
          }
        }
      }
    }

    // --- PAGE 3: Localization Advice ---
    if (localizationAdvice.length > 0) {
        pdf.addPage();
        y = styles.spacing.marginTop; // Reset Y for new page

        y = addWrappedText(t('localization'), margin, y, contentWidth, { fontSize: styles.fontSize.h2, fontStyle: 'bold', color: styles.colors.text }); // Black title
        y += styles.spacing.title_to_list;

        for (const advice of localizationAdvice) {
            checkPageBreak(60);
            const titleText = `${categoryEmojis[advice.category as keyof typeof categoryEmojis] || '📋'} ${advice.title}`;
            y = addWrappedText(titleText, margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent, { fontSize: styles.fontSize.item, fontStyle: 'bold' });
            y += 6;
            
            y = addWrappedText(`Advice: ${advice.advice}`, margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent, { color: styles.colors.textLight });

            y += styles.spacing.section; // More space between advice items
        }
    }

    // Pie de página
    const pageCount = (pdf.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFont('Poppins', 'normal');
      pdf.setFontSize(styles.fontSize.small);
      pdf.setTextColor(styles.colors.textLight);
      pdf.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2, pdf.internal.pageSize.getHeight() - margin / 2,
        { align: 'center' }
      );
    }
    
    const fileName = `UX_Analysis_${imageName.replace(/\.[^/.]+$/, '')}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    // Let the UI handle the user-facing error message
    throw new Error('Failed to generate PDF report.');
  }
}; 