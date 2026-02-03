# System Dashboard - Electron Application

A real-time system monitoring dashboard built with React 19, Vite 7, TypeScript, and Electron 40. Displays memory and network statistics with interactive charts.

## Features

- **Real-time Monitoring**: Memory and network stats updated every 2 seconds
- **Interactive Charts**: Line graphs and pie charts powered by Recharts
- **Modern Stack**: React 19.2.4, Vite 7.3.1, Electron 40.1.0, TypeScript 5.7
- **SOLID Architecture**: Feature-based modular design with dependency injection
- **Tailwind CSS v4**: Modern utility-first styling with Vite plugin
- **Comprehensive Testing**: Vitest with React Testing Library (139+ tests)
- **CI/CD Ready**: GitHub Actions workflow included
- **Electron Security**: Sandbox, CSP, context isolation enabled

## Quick Start

```bash
# Install dependencies (requires Node.js 20+)
npm install

# Start web development server
npm run dev

# Start desktop development
npm run dev:desktop

# Run tests
npm run test

# Build for production
npm run build:desktop
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (web) |
| `npm run dev:desktop` | Start Electron with hot-reload |
| `npm run build` | Build web application |
| `npm run build:web` | Build web for production |
| `npm run build:desktop` | Build Electron for all platforms |
| `npm run build:desktop:win` | Build for Windows |
| `npm run build:desktop:mac` | Build for macOS |
| `npm run build:desktop:linux` | Build for Linux |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Run ESLint |

## Project Structure

```
├── electron/                 # Electron main process
│   ├── main.ts              # App lifecycle, security config, IPC handlers
│   └── preload.ts           # Secure API bridge (stats API)
├── src/
│   ├── features/            # Feature modules
│   │   ├── dashboard/       # System stats dashboard
│   │   │   ├── components/  # UI components (charts, cards, sections)
│   │   │   ├── hooks/       # useSystemStats hook
│   │   │   ├── context/     # StatsContext provider
│   │   │   └── types/       # TypeScript interfaces
│   │   └── breathing/       # Demo breathing exercise (deprecated)
│   ├── shared/              # Shared utilities
│   │   ├── context/         # App-wide contexts
│   │   ├── lib/             # Utilities
│   │   └── types/           # Shared types (ElectronAPI)
│   ├── test/                # Test utilities and mocks
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── .github/workflows/       # CI configuration
└── docs/                    # Documentation
```

## Path Aliases

```typescript
import { DashboardLayout, useStats } from '@features/dashboard';
import { isElectron } from '@shared/index';
import { something } from '@/components/Something';
```

## Adding a New Feature

1. Create feature directory:
   ```
   src/features/my-feature/
   ├── components/
   ├── hooks/
   ├── types/
   └── index.ts
   ```

2. Create barrel export (`index.ts`):
   ```typescript
   export { MyComponent } from './components/MyComponent';
   export { useMyHook } from './hooks/useMyHook';
   ```

3. Add tests in `__tests__/` directories

4. Import in your app:
   ```typescript
   import { MyComponent, useMyHook } from '@features/my-feature';
   ```

## Architecture

This template follows SOLID principles:

- **Single Responsibility**: Each module has one purpose
- **Open/Closed**: Extensible via configuration (e.g., custom breathing patterns)
- **Liskov Substitution**: Patterns implement same interface
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Components use context, not direct dependencies

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed documentation.

## Security

Electron security features enabled:

- `nodeIntegration: false`
- `contextIsolation: true`
- `sandbox: true`
- Content Security Policy headers
- Navigation restriction to trusted origins
- Preload script with contextBridge

## Testing

```bash
# Run all tests
npm run test:run

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test
```

Test coverage targets: 80%+ on business logic.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI framework |
| Vite | 7.3.1 | Build tool |
| Electron | 40.1.0 | Desktop framework |
| TypeScript | 5.7 | Type safety |
| Tailwind CSS | 4.1 | Styling |
| Recharts | 2.x | Data visualization |
| systeminformation | 5.x | System stats (Node.js) |
| Vitest | 4.0 | Testing |
| electron-builder | 26.7 | App packaging |

## Requirements

- Node.js 20+
- npm 10+

## License

MIT License - see [LICENSE](LICENSE)

## System Dashboard

The application displays real-time system statistics:

### Memory Statistics
- Total, used, and free memory
- Memory usage percentage with trend indicators
- Pie chart showing memory allocation
- Line graph showing usage over time

### Network Statistics
- Current download/upload speeds
- Total data transferred
- Line graph showing network activity over time

**Note**: System stats are only available when running in Electron. The web version shows a message indicating stats are unavailable.
