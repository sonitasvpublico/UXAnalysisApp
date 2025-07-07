# Nítida

A professional web application that analyzes images and designs to identify usability issues, accessibility problems, and provides localization recommendations for global markets.

## ⚠️ Usage Terms & License

**This software is provided for educational, personal, and non-commercial use only.**

### Commercial Use Restrictions
- ❌ **No commercial use** without explicit written permission
- ❌ **No selling** the software or derivative works
- ❌ **No incorporating** into commercial products or services
- ❌ **No profit-generating activities** using this software

### Attribution Requirement
- ✅ **Must include attribution**: "Sonia Zavaleta Toukkari - Nítida"
- ✅ **Must preserve copyright notices** in all copies

### For Commercial Use
If you want to use this software commercially, please contact:
- **Author**: Sonia Zavaleta Toukkari
- **Repository**: https://github.com/sonitasvpublico/Nitida

**License**: MIT License with Commercial Use Restrictions - see [LICENSE](LICENSE) file for full terms.

## Features

- **AI-Powered Analysis**: Upload screenshots or images to get comprehensive analysis
- **Multi-Category Issues**: Detects accessibility, usability, design, and localization issues
- **Severity Levels**: Prioritizes issues from critical to low impact
- **Visual Overlays**: Highlights problematic areas directly on your designs
- **Localization Advice**: Market-specific recommendations for Spain, Mexico, and Finland
- **Multi-Language Support**: Interface available in English, Spanish, and Finnish
- **Export Reports**: Download detailed analysis reports in JSON format
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Development**: ESLint + TypeScript ESLint

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ui-ux-analysis-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment Options

### 1. Netlify (Recommended)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### 2. Vercel

1. Connect your repository to Vercel
2. Set framework preset to "Vite"
3. Deploy automatically on push

### 3. Static Hosting

Since this is a client-side React app, you can deploy to any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh

## Usage

1. **Upload Design**: Drag and drop or select a UI screenshot (JPEG, PNG, GIF, WebP up to 10MB)
2. **Analysis**: The AI analyzes your design for various issues
3. **Review Results**: Browse issues by category and severity
4. **Localization**: Check market-specific recommendations
5. **Export**: Download detailed reports for further action

## Issue Categories

- **Accessibility**: Color contrast, alt text, keyboard navigation
- **Usability**: Touch targets, navigation flow, user experience
- **Design**: Typography, spacing, visual hierarchy  
- **Localization**: Text expansion, cultural considerations, local preferences

## Severity Levels

- **Critical**: Must fix - blocks user access or violates standards
- **High**: Should fix - significantly impacts user experience
- **Medium**: Consider fixing - moderate impact on usability
- **Low**: Nice to fix - minor improvements

## Language Support

The application interface supports:
- English (EN)
- Spanish (ES) 
- Finnish (FI)

Localization advice covers markets in Spain, Mexico, and Finland with cultural and technical considerations.

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── AnalysisResults.tsx
│   ├── FileUpload.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   └── LocalizationAdvice.tsx
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utilities and helpers
│   ├── analysisEngine.ts
│   └── translations.ts
└── App.tsx             # Main application component
```

### Adding New Languages

1. Update the `Language` type in `src/types/index.ts`
2. Add translations to `src/utils/translations.ts`
3. Update the language selector in `src/components/Header.tsx`

### Customizing Analysis Rules

The analysis engine is in `src/utils/analysisEngine.ts`. You can:
- Add new issue categories
- Modify severity algorithms
- Extend localization advice for new markets

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the repository.