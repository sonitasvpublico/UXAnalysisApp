import jsPDF from 'jspdf';
import type { AnalysisResult, LocalizationAdvice, Language } from '../types';
import { getTranslation } from './translations';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

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

// Helper para chequear espacio antes de cada bloque
const ensureSpace = (neededSpace: number, pdf: any, margin: number, y: number) => {
  const pageHeight = pdf.internal.pageSize.getHeight();
  const footerSpace = 32; // espacio de respiro antes del footer
  if (y + neededSpace + footerSpace > pageHeight - margin) {
    pdf.addPage();
    return styles.spacing.marginTop;
  }
  return y;
};

function isNativeMobile() {
  return Capacitor.isNativePlatform();
}

export const generateBeautifulPDF = async (data: PDFReportData): Promise<void> => {
  try {
    const { results, localizationAdvice, imageName, targetCountry, imageUrl, imageDimensions, currentLanguage } = data;
    
    const pdf = new jsPDF('p', 'pt', 'a4'); // Using points for more control
    
    // --- Load Fonts into PDF ---
    const poppinsRegularBase64 = await getFontAsBase64('fonts/Poppins-Regular.ttf');
    const poppinsBoldBase64 = await getFontAsBase64('fonts/Poppins-Bold.ttf');
    const poppinsItalicBase64 = await getFontAsBase64('fonts/Poppins-Italic.ttf');
    const poppinsExtraLightBase64 = await getFontAsBase64('fonts/Poppins-ExtraLight.ttf');

    pdf.addFileToVFS('Poppins-Regular.ttf', poppinsRegularBase64);
    pdf.addFont('Poppins-Regular.ttf', 'Poppins', 'normal');

    pdf.addFileToVFS('Poppins-Bold.ttf', poppinsBoldBase64);
    pdf.addFont('Poppins-Bold.ttf', 'Poppins', 'bold');

    pdf.addFileToVFS('Poppins-Italic.ttf', poppinsItalicBase64);
    pdf.addFont('Poppins-Italic.ttf', 'Poppins', 'italic');

    pdf.addFileToVFS('Poppins-ExtraLight.ttf', poppinsExtraLightBase64);
    pdf.addFont('Poppins-ExtraLight.ttf', 'Poppins', 'extralight');
    // --- End Font Loading ---

    pdf.setFont('Poppins', 'normal');
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = styles.spacing.margin;
    const contentWidth = pageWidth - (margin * 2);
    let y = styles.spacing.marginTop;

    const t = (key: string) => getTranslation(currentLanguage, key);

    // --- HEADER: Logo + Fecha ---
    // Usar ruta relativa para el logo, funciona en local, web y app
    const logoUrl = 'nitida-logo.png';
    // Función robusta para obtener base64 de una imagen
    async function getBase64Image(url: string): Promise<string> {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        };
        img.onerror = function () {
          reject(new Error('No se pudo cargar la imagen: ' + url));
        };
        img.src = url;
      });
    }
    let logoImg: string;
    try {
      logoImg = await getBase64Image(logoUrl);
    } catch (e) {
      alert('No se pudo cargar el logo para el PDF. Verifica que nitida-logo.png esté en la carpeta public.');
      throw e;
    }
    const logoWidth = 120;
    const logoHeight = 34;
    pdf.addImage(logoImg, 'PNG', margin, y, logoWidth, logoHeight, undefined, 'FAST');
    // Fecha (en negro)
    pdf.setFont('Poppins', 'normal');
    pdf.setFontSize(styles.fontSize.small);
    pdf.setTextColor(styles.colors.text); // negro
    const fecha = new Date().toLocaleDateString();
    pdf.text(fecha, pageWidth - margin, y + 18, { align: 'right' });
    y += logoHeight + 32; // Más espacio debajo del header

    // --- RESUMEN DEL ANÁLISIS ---
    pdf.setFont('Poppins', 'normal'); // font normal, no bold
    pdf.setFontSize(styles.fontSize.h2);
    pdf.setTextColor(styles.colors.text);
    pdf.text(getTranslation(currentLanguage, 'pdf_summary'), margin, y);
    y += 24;
    pdf.setFont('Poppins', 'normal');
    pdf.setFontSize(styles.fontSize.body);
    pdf.setTextColor(styles.colors.text);
    pdf.text(`${getTranslation(currentLanguage, 'pdf_image')}: ${imageName}`, margin, y);
    y += 18;
    pdf.text(`${getTranslation(currentLanguage, 'pdf_target_country')}: ${targetCountry}`, margin, y);
    y += 18;
    pdf.text(`${getTranslation(currentLanguage, 'pdf_issues_count')}: ${results.length}`, margin, y);
    y += 28;

    // --- IMAGEN ANALIZADA (centrada, tamaño controlado) ---
    if (imageUrl && imageDimensions) {
      const maxImgWidth = 300;
      const maxImgHeight = 180;
      let imgW = imageDimensions.width;
      let imgH = imageDimensions.height;
      // Escalar proporcionalmente
      const widthRatio = maxImgWidth / imgW;
      const heightRatio = maxImgHeight / imgH;
      const scale = Math.min(widthRatio, heightRatio, 1);
      imgW = imgW * scale;
      imgH = imgH * scale;
      const imgX = margin + (contentWidth - imgW) / 2;
      let imgBase64 = imageUrl;
      // Si no es base64, conviértelo
      if (!/^data:image\/(png|jpeg);base64,/.test(imageUrl)) {
        try {
          imgBase64 = await getBase64Image(imageUrl);
        } catch (e) {
          alert('No se pudo cargar la imagen analizada para el PDF.');
          throw e;
        }
      }
      pdf.addImage(imgBase64, 'PNG', imgX, y, imgW, imgH, undefined, 'FAST');
      y += imgH + 24;
    }

    // --- LISTA DE ISSUES ---
    pdf.setFont('Poppins', 'normal'); // font normal, no bold
    pdf.setFontSize(styles.fontSize.h2);
    pdf.setTextColor(styles.colors.text);
    pdf.text(getTranslation(currentLanguage, 'pdf_issues_found'), margin, y);
    y += 28; // más espacio después del título
    if (results.length > 0) {
      const severityOrder = ['critical', 'high', 'medium', 'low'] as const;
      for (const severity of severityOrder) {
        const issuesOfSeverity = results.filter(r => r.severity === severity);
        if (issuesOfSeverity.length > 0) {
          pdf.setFont('Poppins', 'normal'); // font normal para subtítulo
          pdf.setFontSize(styles.fontSize.h3);
          pdf.setTextColor(styles.colors[severity]);
          pdf.text(`${severityEmojis[severity]} ${getTranslation(currentLanguage, `severity.${severity}`)}`, margin + 8, y);
          y += 28; // más espacio después del título de severidad
          for (const issue of issuesOfSeverity) {
            pdf.setFont('Poppins', 'normal');
            pdf.setFontSize(styles.fontSize.body + 2); // subtítulo más grande
            pdf.setTextColor(styles.colors.text);
            let cleanTitle = issue.title.replace(/^\[.*?\]\s*/, '');
            const issueTitleLines = pdf.splitTextToSize(`• ${categoryEmojis[issue.category]} ${cleanTitle}`, contentWidth - 40);
            const descLines = pdf.splitTextToSize(issue.description, contentWidth - 56);
            const descLineHeight = (styles.fontSize.body + 1) * 1.5;
            // Definir suggLines y suggLineHeight siempre, aunque no haya sugerencia
            const suggLines = issue.suggestion ? pdf.splitTextToSize(`${getTranslation(currentLanguage, 'pdf_suggestion')}: ${issue.suggestion}`, contentWidth - 56) : [];
            const suggLineHeight = (styles.fontSize.body + 1) * 1.5;
            const blockHeight =
              issueTitleLines.length * (styles.fontSize.body + 2) + 8 +
              descLines.length * descLineHeight + 8 +
              (issue.suggestion ? (suggLines.length * suggLineHeight + 10 + 6) : 0) +
              24;
            y = ensureSpace(blockHeight, pdf, margin, y);
            pdf.text(issueTitleLines, margin + 24, y);
            y += issueTitleLines.length * (styles.fontSize.body + 2) + 8; // más espacio después del subtítulo
            // Descripción (ajustar margen derecho y aumentar interlineado)
            pdf.setFontSize(styles.fontSize.body + 1);
            pdf.setTextColor(styles.colors.textLight);
            descLines.forEach((line: string, idx: number) => {
              pdf.text(line, margin + 32, y + idx * descLineHeight);
            });
            y += descLines.length * descLineHeight + 8;
            if (issue.suggestion) {
              y += 6; // más espacio antes de la sugerencia
              pdf.setFont('Poppins', 'italic'); // jsPDF no soporta extralightitalic, así que usamos italic
              pdf.setTextColor(styles.colors.text); // negro
              pdf.setFontSize(styles.fontSize.body + 1);
              suggLines.forEach((line: string, idx: number) => {
                pdf.text(line, margin + 32, y + idx * suggLineHeight);
              });
              y += suggLines.length * suggLineHeight + 10; // más espacio después de la sugerencia
            }
          }
          y += 4; // menos espacio entre severidades
        }
      }
    } else {
      pdf.setFont('Poppins', 'normal');
      pdf.setFontSize(styles.fontSize.body);
      pdf.setTextColor(styles.colors.textLight);
      pdf.text('No se encontraron issues.', margin + 8, y);
      y += 18;
    }
    y += 18; // más espacio antes de la siguiente sección

    // --- CONSEJOS DE LOCALIZACIÓN ---
    if (localizationAdvice && localizationAdvice.length > 0) {
      pdf.setFont('Poppins', 'normal'); // font normal, no bold
      pdf.setFontSize(styles.fontSize.h2);
      pdf.setTextColor(styles.colors.text);
      pdf.text(getTranslation(currentLanguage, 'pdf_localization_advice'), margin, y);
      y += 28;
      pdf.setFont('Poppins', 'normal');
      pdf.setFontSize(styles.fontSize.body + 1);
      pdf.setTextColor(styles.colors.text);
      for (const advice of localizationAdvice) {
        const adviceLines = pdf.splitTextToSize(`• ${advice.advice}`, contentWidth - 40);
        adviceLines.forEach((line: string, idx: number) => {
          // Chequear espacio antes de cada línea
          y = ensureSpace((styles.fontSize.body + 1) * 1.5, pdf, margin, y);
          pdf.text(line, margin + 16, y);
          y += (styles.fontSize.body + 1) * 1.5;
        });
        y += 8; // más espacio entre consejos
      }
      y += 10;
    }

    // --- FOOTER EN TODAS LAS PÁGINAS ---
    const pageCount = (pdf.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      const footerY = pdf.internal.pageSize.getHeight() - margin + 18;
      pdf.setFont('Poppins', 'normal');
      pdf.setFontSize(styles.fontSize.small);
      pdf.setTextColor(styles.colors.textLight);
      pdf.text(getTranslation(currentLanguage, 'pdf_generated_by'), pageWidth / 2, footerY, { align: 'center' });
    }

    const fileName = `Reporte-NitidaAI-${imageName}.pdf`;
    if (isNativeMobile()) {
      try {
        const pdfBase64 = pdf.output('datauristring').split(',')[1];
        
        // Para iOS, usar Directory.Data que es más accesible
        const directory = Capacitor.getPlatform() === 'ios' ? Directory.Data : Directory.External;
        
        await Filesystem.writeFile({
          path: fileName,
          data: pdfBase64,
          directory: directory,
        });
        
        // Mensaje específico para iOS
        if (Capacitor.getPlatform() === 'ios') {
          alert('¡Listo! El reporte se guardó en Files.');
        } else {
          alert('¡Listo! El reporte se guardó en Files.');
        }
      } catch (fsError) {
        const msg = typeof fsError === 'object' && fsError && 'message' in fsError ? (fsError as any).message : String(fsError);
        alert('Error guardando el PDF en el dispositivo: ' + msg);
        throw fsError;
      }
    } else {
      pdf.save(fileName);
    }
  } catch (error) {
    const msg = typeof error === 'object' && error && 'message' in error ? (error as any).message : String(error);
    alert('Error al generar el PDF: ' + msg);
  }
}; 