# Interactive User Profile Cards — Frontend (React)

## Introduction

### Overview
This frontend application lets you generate and customize interactive user profile cards with selectable themes. It follows a minimalist “Soft Mono” style guide, emphasizing clean typography, generous whitespace, and subtle visual accents. You can edit name, title, bio, avatar image URL, and add multiple links. The app provides a live preview and supports exporting your card to PNG or saving your configuration as JSON.

### Scope
This README explains how to set up, run, develop, customize themes, export cards, run tests, and use the app effectively.

## Getting Started

### Prerequisites
- Node.js 16+ and npm installed.

### Installation
1. Navigate to the frontend container:
   - cd interactive-user-profile-cards-651397-651406/frontend_react_js
2. Install dependencies:
   - npm install

No environment variables are required for this container.

## Development

### Run the app
- npm start

This starts the development server and opens the app at:
- http://localhost:3000

The page automatically reloads on code changes. Lint messages and runtime errors appear in the console.

### Build for production
- npm run build

This produces an optimized build in the build/ folder.

## Application Guide

### Layout and Flow
- Top navigation: Choose the active theme.
- Left panel (Editor): Enter name, title, bio, avatar URL, and add/remove links.
- Right panel (Preview): Live preview of the profile card.
- Export bar: Export PNG and Export JSON buttons below the editor.

### Editing the Card
- Name: Shown prominently on the card.
- Title: Secondary line beneath the name.
- Bio: A short paragraph; keep it concise.
- Avatar URL: Any publicly accessible image URL. If left blank, an initial placeholder is displayed.
- Links: Add multiple links with a label and a URL. You can remove individual links as needed.

## Theme Customization

### Built-in Themes
The app includes three Soft Mono variants:
- Soft Mono: Monochrome with warm touches
- Warm Mono: Softer contrasts, warmer subtle surfaces
- Deep Mono: Darker grayscale with crisp text

Select a theme using the theme dropdown in the top navigation. Theme tokens are applied to the document root as CSS variables, ensuring a consistent look.

### Theme Tokens and CSS Variables
Themes are defined in src/App.js and written to CSS variables used by src/App.css:

- --sm-bg: Background
- --sm-surface: Surface (panels, card frame)
- --sm-text: Primary text color
- --sm-primary: Accent color for buttons and highlights
- --sm-secondary: Secondary accents
- --sm-success: Success color
- --sm-error: Error color
- --sm-subtle: Borders/dividers and subtle outlines

You can adjust spacing, border radii, and shadows via:
- --sm-radius, --sm-radius-sm
- --sm-shadow, --sm-shadow-soft
- --sm-spacing, --sm-spacing-lg, --sm-spacing-xl
- --sm-font

These are defined in src/App.css under the “Soft Mono Minimalist Theme Variables” section.

### Adding a New Theme
1. Open src/App.js.
2. Locate the SOFT_MONO_THEMES object.
3. Add a new key with a structure similar to existing entries:
   {
     name: 'My Theme',
     description: 'Short description',
     primary: '#...',
     secondary: '#...',
     success: '#10B981',
     error: '#EF4444',
     background: '#...',
     surface: '#FFFFFF',
     text: '#111827',
     subtle: '#E5E7EB'
   }
4. The theme automatically appears in the theme selector.

Tip: Try to keep contrast ratios high for accessibility and legibility.

## Exporting Cards

### Export as PNG
- Click “Export PNG” to download a snapshot of the card preview area.
- Implementation details:
  - The app lazily imports html-to-image to convert the preview node to a PNG.
  - Pixel ratio and background color are set to ensure crisp output in the chosen theme.

If the browser blocks downloads or the export fails, you will see a console error and an alert. Try again or check that the preview is visible.

### Export as JSON
- Click “Export JSON” to download a profile-card.json file containing:
  {
    "themeKey": "SoftMono | WarmMono | DeepMono",
    "profile": {
      "name": "...",
      "title": "...",
      "bio": "...",
      "avatarUrl": "...",
      "links": [{ "label": "...", "url": "..." }]
    }
  }

You can store this configuration and rehydrate it by manually pasting the values into the editor fields.

## Testing

### Run tests
- npm test

The project uses react-scripts test with @testing-library/jest-dom setup in src/setupTests.js. A basic test exists in src/App.test.js to ensure the main heading renders:
- Renders “Create your card” in the editor panel.

For CI environments where you want the test to run once and exit, use:
- CI=true npm test

### Writing Additional Tests
- Place tests alongside components or in src/ with .test.js naming.
- Use @testing-library/react utilities for DOM interactions and assertions.

## Code Structure

### Key Files
- src/App.js: Main application, components, and theme definition.
- src/App.css: Soft Mono minimalist style and utility classes.
- src/index.js: React entry point.
- src/App.test.js: Example test.
- src/setupTests.js: Testing library configuration.

### Public Interfaces (in App.js)
- useSoftMonoTheme(activeKey): Applies theme variables to document root and returns theme tokens.
- TopNav: Navigation bar with theme selector.
- CardEditor: Form for updating profile data.
- ProfileCard: Renders the card based on profile data.
- ExportBar: Buttons to export PNG and JSON.

## Usage Tips

### Avatar Images
- Use a square image URL for best results; the preview crops via object-fit: cover.
- If the URL fails or CORS blocks the fetch, the placeholder initial is shown.

### Links
- Use descriptive labels like “GitHub”, “LinkedIn”, or “Portfolio” for clarity.
- External links open in a new tab and use rel="noreferrer".

### Accessibility
- Labels, aria- attributes, and proper semantics are used to improve keyboard and screen reader experiences.
- Maintain good contrast when customizing themes.

### Troubleshooting
- Blank page: Check the browser console for errors and ensure npm start is running.
- PNG export issues: Verify that the preview is visible and the browser allows downloads. Some remote images may block cross-origin rendering; prefer images that permit CORS.
- Styling looks off: Verify the theme variables in src/App.css and that useSoftMonoTheme is invoked with the desired themeKey.

## License
This project uses a lightweight React template and custom code for the profile card editor. Review your organization’s license policies before distribution.
