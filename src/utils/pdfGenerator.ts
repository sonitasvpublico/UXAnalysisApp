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
    let y = margin;

    const t = (key: string) => getTranslation(currentLanguage, key);

    const addWrappedText = (text: string, x: number, currentY: number, maxWidth: number, options: { fontSize?: number; fontStyle?: 'normal' | 'bold'; color?: string; align?: 'left' | 'center' | 'right' } = {}) => {
      const { fontSize = styles.fontSize.body, fontStyle = 'normal', color = styles.colors.text, align = 'left' } = options;
      const lineHeight = 1.5; // Increased for better readability

      pdf.setFont('Poppins', fontStyle);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(color);
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      const textHeight = lines.length * fontSize * lineHeight;
      
      // Check for page break BEFORE drawing text
      checkPageBreak(textHeight);

      pdf.text(lines, x, currentY, { align, lineHeightFactor: lineHeight });
      
      return currentY + (textHeight / lineHeight) + 4; // Return the new Y position
    };

    const checkPageBreak = (neededSpace: number) => {
      if (y + neededSpace > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        y = margin;
      }
    };
    
    const addDecorativeLine = (currentY: number) => {
      checkPageBreak(15);
      pdf.setDrawColor(styles.colors.border);
      pdf.setLineWidth(0.5);
      pdf.line(margin, currentY, pageWidth - margin, currentY);
      return currentY + 15;
    };

    // --- Título principal (H1) ---
    pdf.setFont('Poppins', 'bold');
    pdf.setFontSize(styles.fontSize.h1);
    pdf.setTextColor(styles.colors.primary);
    pdf.text('✨ UI/UX Analysis Report', pageWidth / 2, y, { align: 'center' });
    y += styles.fontSize.h1 + 12;

    // Fecha
    pdf.setFont('Poppins', 'normal');
    pdf.setFontSize(styles.fontSize.small);
    pdf.setTextColor(styles.colors.textLight);
    pdf.text(new Date().toLocaleDateString(currentLanguage), pageWidth / 2, y, { align: 'center' });
    y += styles.fontSize.small + 8;
    pdf.setDrawColor(styles.colors.border);
    pdf.setLineWidth(0.2);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 12;

    // --- Two-Column Layout for Project Info & Screenshot ---
    const leftColumnWidth = contentWidth * 0.55;
    const rightColumnWidth = contentWidth * 0.40;
    const gutter = contentWidth * 0.05;
    const rightColumnX = margin + leftColumnWidth + gutter;
    
    const infoStartY = y;
    let textY = y;

    // H2: Project Details
    pdf.setFont('Poppins', 'bold');
    pdf.setFontSize(styles.fontSize.h2);
    pdf.setTextColor(styles.colors.text);
    pdf.text('Project Details', margin, textY);
    textY += styles.fontSize.h2 + 6;

    const addDetail = (label: string, value: string, currentY: number) => {
        pdf.setFont('Poppins', 'bold');
        pdf.setFontSize(styles.fontSize.body);
        pdf.text(`${label}:`, margin, currentY);

        pdf.setFont('Poppins', 'normal');
        pdf.text(value, margin + 70, currentY);
        return currentY + styles.fontSize.body * styles.spacing.lineHeight + styles.spacing.between_items;
    };
    
    textY = addDetail('Screenshot', imageName, textY);
    textY = addDetail('Target', targetCountry, textY);
    textY = addDetail('Issues Found', String(results.length), textY);
    
    let imageThumbY = infoStartY;
    if (imageUrl && imageDimensions) {
        const aspectRatio = imageDimensions.width / imageDimensions.height;
        const imgWidth = rightColumnWidth;
        const imgHeight = imgWidth / aspectRatio;
        
        checkPageBreak(imgHeight + 10);
        
        // Draw a subtle border around the image
        pdf.setDrawColor(styles.colors.border);
        pdf.setLineWidth(1);
        pdf.rect(rightColumnX, imageThumbY, imgWidth, imgHeight);
        pdf.addImage(imageUrl, 'PNG', rightColumnX, imageThumbY, imgWidth, imgHeight);
        imageThumbY += imgHeight + 10; 
    }

    y = Math.max(textY, imageThumbY);
    y = addDecorativeLine(y);
    y += 10;

    // --- Full Screenshot Display ---
    if (imageUrl && imageDimensions) {
        const aspectRatio = imageDimensions.width / imageDimensions.height;
        const imgWidth = contentWidth;
        const imgHeight = imgWidth / aspectRatio;
        
        checkPageBreak(imgHeight + 20);
        
        pdf.setDrawColor(styles.colors.border);
        pdf.setLineWidth(1);
        pdf.rect(margin, y, imgWidth, imgHeight);
        pdf.addImage(imageUrl, 'PNG', margin, y, imgWidth, imgHeight);
        y += imgHeight + 20;
    }

    // --- Analysis Results (por prioridad) ---
    if (results.length > 0) {
      y = addDecorativeLine(y);
      checkPageBreak(styles.fontSize.h2);
      pdf.setFont('Poppins', 'bold');
      pdf.setFontSize(styles.fontSize.h2);
      pdf.setTextColor(styles.colors.primary);
      pdf.text(t('suggestions'), margin, y);
      y += styles.fontSize.h2 + styles.spacing.title_to_list;

      const severityOrder = ['critical', 'high', 'medium', 'low'] as const;
      for (const severity of severityOrder) {
        const issuesOfSeverity = results.filter(r => r.severity === severity);
        if (issuesOfSeverity.length > 0) {
          checkPageBreak(styles.fontSize.h2 * 2);
          
          pdf.setFont('Poppins', 'bold');
          pdf.setFontSize(styles.fontSize.h2);
          pdf.setTextColor(styles.colors[severity]);
          pdf.text(
            `${severityEmojis[severity]} ${severity.charAt(0).toUpperCase() + severity.slice(1)} (${issuesOfSeverity.length})`,
            margin, y
          );
          y += styles.fontSize.h2 * 1.5;

          issuesOfSeverity.forEach((issue, index) => {
            const issueNumber = `${index + 1}. `;
            const categoryEmoji = categoryEmojis[issue.category] || '📋';
            const titleText = `${issueNumber}${categoryEmoji} ${issue.title}`;
            
            checkPageBreak(60); // Estimate space for an issue
            
            y = addWrappedText(
              titleText, margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent * 2,
              { fontStyle: 'bold', fontSize: styles.fontSize.item, color: styles.colors.text }
            );

            y = addWrappedText(`Description: ${issue.description}`, margin + styles.spacing.indent * 2, y, contentWidth - styles.spacing.indent * 2, { color: styles.colors.textLight });
            y = addWrappedText(`Suggestion: ${issue.suggestion}`, margin + styles.spacing.indent * 2, y, contentWidth - styles.spacing.indent * 2);
            y += styles.spacing.between_items;
          });
        }
      }
    }

    // --- Localization Recommendations ---
    if (localizationAdvice.length > 0) {
      y = addDecorativeLine(y);
      checkPageBreak(styles.fontSize.h2);
      pdf.setFont('Poppins', 'bold');
      pdf.setFontSize(styles.fontSize.h2);
      pdf.setTextColor(styles.colors.primary);
      pdf.text(`🌍 ${t('localization')}`, margin, y);
      y += styles.fontSize.h2 + styles.spacing.title_to_list;

      localizationAdvice.forEach((advice, index) => {
        checkPageBreak(50);
        
        y = addWrappedText(
          `${index + 1}. ${advice.title}`,
          margin + styles.spacing.indent, y, contentWidth - styles.spacing.indent * 2,
          { fontStyle: 'bold', fontSize: styles.fontSize.item }
        );

        y = addWrappedText(advice.advice, margin + styles.spacing.indent * 2, y, contentWidth - styles.spacing.indent * 2, { color: styles.colors.textLight });
        y += styles.spacing.between_items;
      });
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