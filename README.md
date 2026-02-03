# Breath Exercise - 4-7-8 Breathing App

A modern breathing exercise application that guides users through the 4-7-8 breathing technique. Available as both a web application and a cross-platform desktop application built with Electron.

## Features

- 🫁 **4-7-8 Breathing Technique** - Guided breathing exercise (inhale 4s, hold 7s, exhale 8s)
- ⏱️ **Customizable Sessions** - Choose from 2, 5, 10, or 15 minute sessions
- 📊 **Progress Tracking** - View cycle count and session time remaining
- 🎨 **Visual Feedback** - Animated breathing circle that changes with each phase
- 💻 **Cross-Platform** - Available as web app and desktop app (macOS, Windows, Linux)

## Tech Stack

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast frontend tooling
- ⚛️ [React 19](https://react.dev/) - Latest version of React
- 📝 [TypeScript](https://www.typescriptlang.org/) - Type safety
- 🎨 [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- 🖥️ [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- 🧹 [ESLint](https://eslint.org/) - Modern linting rules

## Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd breath-electron

# Install dependencies
npm install
```

## Development

### Web Development

Start the development server for web:

```bash
npm run dev
```

Visit http://localhost:5173 to see your application running.

### Desktop Development

Run the application in Electron with hot-reload:

```bash
npm run dev:desktop
```

This will:
1. Start the Vite dev server
2. Build the Electron main process
3. Launch the Electron app with DevTools open

## Building

### Web Build

Build the web application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory. Preview the production build:

```bash
npm run preview
```

### Desktop Build

Build the desktop application for all platforms:

```bash
npm run build:desktop
```

Build for a specific platform:

```bash
# macOS
npm run build:desktop:mac

# Windows
npm run build:desktop:win

# Linux
npm run build:desktop:linux
```

Built applications will be in the `release/` directory:
- **macOS**: `.dmg` and `.zip` files
- **Windows**: `.exe` installer (NSIS) and `.zip` files
- **Linux**: `.AppImage`, `.deb`, and `.rpm` packages

### Desktop Build Process

The desktop build process:
1. Builds the React app with Vite in desktop mode (sets base path to `./`)
2. Compiles the Electron main process TypeScript files
3. Packages everything with electron-builder

## Available Scripts

### Development
- `npm run dev` - Start web development server
- `npm run dev:desktop` - Start desktop development with hot-reload

### Building
- `npm run build` - Build web application for production
- `npm run build:desktop` - Build desktop app for all platforms
- `npm run build:desktop:mac` - Build desktop app for macOS
- `npm run build:desktop:win` - Build desktop app for Windows
- `npm run build:desktop:linux` - Build desktop app for Linux

### Utilities
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production web build locally
- `npm run preview:desktop` - Build and preview desktop app locally

## Project Structure

```
breath-electron/
├── dist/                  # Web build output
├── electron/              # Electron main process
│   ├── main.ts           # Main process entry point
│   └── preload.ts        # Preload script
├── electron-dist/         # Compiled Electron files
├── release/              # Desktop build output
├── src/                  # Source files
│   ├── components/       # React components
│   │   ├── BreathingCircle.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── ProgressInfo.tsx
│   │   └── QuoteGen.tsx
│   ├── hooks/            # React hooks
│   │   └── useBreathingTimer.ts
│   ├── lib/              # Utilities
│   │   └── isElectron.ts
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main App component
│   ├── App.css           # App-specific styles
│   ├── index.css         # Global styles with Tailwind
│   └── main.tsx          # Entry point
├── .gitignore
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration (root)
├── tsconfig.app.json     # TypeScript config for app
├── tsconfig.electron.json # TypeScript config for Electron
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## How It Works

The 4-7-8 breathing technique is a relaxation exercise that involves:
1. **Inhale** for 4 seconds
2. **Hold** your breath for 7 seconds
3. **Exhale** for 8 seconds

This cycle repeats throughout your session. The app provides visual and timing guidance to help you maintain the correct rhythm.

## License

This project is open source and available under the [MIT License](LICENSE).
