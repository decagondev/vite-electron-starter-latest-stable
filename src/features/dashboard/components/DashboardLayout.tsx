/**
 * DashboardLayout component
 * Main container for the dashboard sections
 * Follows Single Responsibility - focused on layout orchestration
 */

import { memo } from 'react'
import { useStats } from '../context/StatsContext'
import { MemorySection } from './MemorySection'
import { NetworkSection } from './NetworkSection'
import { ProcessesSection } from './ProcessesSection'

/**
 * Dashboard icon SVG component
 */
function DashboardIcon(): React.ReactElement {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
      />
    </svg>
  )
}

/**
 * Refresh icon SVG component
 */
function RefreshIcon(): React.ReactElement {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
      />
    </svg>
  )
}

/**
 * DashboardHeader component
 * Shows title and refresh button
 */
function DashboardHeader(): React.ReactElement {
  const { refreshStats, isLoading, systemInfo } = useStats()

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <DashboardIcon />
          Deca Dash
        </h1>
        {systemInfo && (
          <p className="text-sm text-slate-400 mt-1">
            {systemInfo.hostname} · {systemInfo.osName} · {systemInfo.cpuModel}
          </p>
        )}
      </div>
      <button
        onClick={refreshStats}
        disabled={isLoading}
        className="
          flex items-center gap-2 px-4 py-2
          bg-slate-700 hover:bg-slate-600 
          disabled:opacity-50 disabled:cursor-not-allowed
          text-slate-200 rounded-lg transition-colors
          text-sm font-medium
        "
      >
        <span className={isLoading ? 'animate-spin' : ''}>
          <RefreshIcon />
        </span>
        Refresh
      </button>
    </header>
  )
}

/**
 * DashboardLayout component
 * Container that renders all dashboard sections
 * 
 * @returns React element
 * 
 * @example
 * ```tsx
 * <StatsProvider>
 *   <DashboardLayout />
 * </StatsProvider>
 * ```
 */
function DashboardLayoutComponent(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <main className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
            <MemorySection />
            <NetworkSection />
          </div>
          <ProcessesSection />
        </main>

        <footer className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-500">
          <p>Real-time system monitoring · Polling every 2 seconds</p>
        </footer>
      </div>
    </div>
  )
}

/**
 * Memoized DashboardLayout for performance
 */
export const DashboardLayout = memo(DashboardLayoutComponent)
