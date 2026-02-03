import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BreathingProvider } from '@features/breathing'
import { ElectronProvider } from '@shared/index'

/**
 * Application entry point
 * Wraps App with context providers for dependency injection
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ElectronProvider>
      <BreathingProvider>
        <App />
      </BreathingProvider>
    </ElectronProvider>
  </StrictMode>,
)
