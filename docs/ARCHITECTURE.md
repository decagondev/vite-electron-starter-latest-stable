# Architecture Documentation

This document describes the architectural decisions and patterns used in this Vite-React-TypeScript-Electron template.

## Overview

The project follows a feature-based modular architecture with SOLID principles, enabling easy extension and maintenance.

## Project Structure

```
├── electron/                 # Electron main process
│   ├── main.ts              # Application entry point
│   └── preload.ts           # Secure bridge to renderer
├── src/
│   ├── features/            # Feature modules
│   │   └── breathing/       # Breathing exercise feature
│   │       ├── components/  # React components
│   │       ├── hooks/       # Custom hooks
│   │       ├── context/     # React context providers
│   │       ├── constants/   # Configuration constants
│   │       ├── types/       # TypeScript types
│   │       └── index.ts     # Barrel export
│   ├── shared/              # Shared utilities
│   │   ├── components/      # Shared React components
│   │   ├── context/         # Shared context providers
│   │   ├── lib/             # Utility functions
│   │   ├── types/           # Shared type definitions
│   │   └── index.ts         # Barrel export
│   ├── test/                # Test utilities
│   │   ├── mocks/           # Mock implementations
│   │   └── setup.ts         # Test configuration
│   ├── App.tsx              # Root component
│   └── main.tsx             # React entry point
├── .github/workflows/       # CI/CD configuration
└── docs/                    # Documentation
```

## SOLID Principles

### Single Responsibility (SRP)

Each module has a single, well-defined purpose:

- **Components**: Only handle rendering and user interaction
- **Hooks**: Only manage state and side effects
- **Context**: Only provide dependency injection
- **Constants**: Only define configuration values

### Open/Closed Principle (OCP)

The breathing feature is extensible without modification:

```typescript
// Custom breathing pattern without modifying core code
const customPattern: IBreathingPatternConfig = {
  name: 'Custom 3-3-3',
  phases: [
    { name: 'inhale', duration: 3, instruction: 'Breathe In' },
    { name: 'hold', duration: 3, instruction: 'Hold' },
    { name: 'exhale', duration: 3, instruction: 'Breathe Out' },
  ],
};

// Use with the hook
useBreathingTimer({ pattern: customPattern });
```

### Liskov Substitution (LSP)

All breathing patterns implement the same interface and can be substituted:

```typescript
interface IBreathingPatternConfig {
  name: string;
  phases: IBreathingPhaseConfig[];
}
```

### Interface Segregation (ISP)

Interfaces are small and focused:

- `ITimerState` - Timer state values only
- `ITimerControls` - Timer control actions only
- `IBreathingPhaseConfig` - Phase configuration only

### Dependency Inversion (DIP)

Components depend on abstractions (Context) not implementations:

```typescript
// Component depends on context, not direct hook
function App() {
  const { state } = useBreathing(); // From context
}
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         App                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              ElectronProvider (optional)               │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                BreathingProvider                 │  │  │
│  │  │  ┌─────────────────────────────────────────────┐│  │  │
│  │  │  │              useBreathingTimer              ││  │  │
│  │  │  │  ┌─────────┐  ┌───────────┐  ┌──────────┐  ││  │  │
│  │  │  │  │ State   │  │ Controls  │  │ Config   │  ││  │  │
│  │  │  │  └────┬────┘  └─────┬─────┘  └────┬─────┘  ││  │  │
│  │  │  └───────┼─────────────┼─────────────┼────────┘│  │  │
│  │  │          │             │             │          │  │  │
│  │  │  ┌───────┼─────────────┼─────────────┼────────┐│  │  │
│  │  │  │       ▼             ▼             ▼        ││  │  │
│  │  │  │  BreathingCircle  ControlPanel  ProgressInfo│  │  │
│  │  │  └────────────────────────────────────────────┘│  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Electron Security

The template implements Electron security best practices:

1. **Context Isolation**: Renderer process is isolated from Node.js
2. **Sandbox Mode**: Renderer runs in sandboxed environment
3. **CSP Headers**: Content Security Policy restricts resource loading
4. **Navigation Restriction**: Only trusted origins allowed
5. **Preload Script**: Secure bridge using contextBridge API

## Testing Strategy

- **Unit Tests**: Timer logic, constants, utilities
- **Component Tests**: React components with Testing Library
- **Integration Tests**: Full feature flows
- **Mocks**: Electron API mocks for testing without runtime

## Path Aliases

```typescript
// Available aliases
import { useBreathing } from '@features/breathing';
import { isElectron } from '@shared/index';
import { mockElectronAPI } from '@/test/mocks/electron';
```

## Adding New Features

1. Create feature directory: `src/features/my-feature/`
2. Add components, hooks, types, and context
3. Create barrel export: `index.ts`
4. Register with providers in `main.tsx`
5. Add tests in `__tests__/` directories
