/**
 * Tests for DashboardLayout component
 * Verifies rendering, header, and section composition
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardLayout } from '../DashboardLayout'
import { StatsProvider } from '../../context/StatsContext'
import { setupElectronMock, clearElectronMock } from '@/test/mocks/electron'

/**
 * Wrapper component with provider
 */
function DashboardLayoutWithProvider(): React.ReactElement {
  return (
    <StatsProvider options={{ autoStart: false }}>
      <DashboardLayout />
    </StatsProvider>
  )
}

describe('DashboardLayout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setupElectronMock('win32', true)
  })

  afterEach(() => {
    vi.useRealTimers()
    clearElectronMock()
    vi.restoreAllMocks()
  })

  it('renders dashboard title', () => {
    render(<DashboardLayoutWithProvider />)
    expect(screen.getByText('System Dashboard')).toBeInTheDocument()
  })

  it('renders refresh button', () => {
    render(<DashboardLayoutWithProvider />)
    expect(screen.getByText('Refresh')).toBeInTheDocument()
  })

  it('renders Memory section', () => {
    render(<DashboardLayoutWithProvider />)
    expect(screen.getByText('Memory')).toBeInTheDocument()
  })

  it('renders Network section', () => {
    render(<DashboardLayoutWithProvider />)
    expect(screen.getByText('Network')).toBeInTheDocument()
  })

  it('renders footer with polling info', () => {
    render(<DashboardLayoutWithProvider />)
    expect(screen.getByText(/Polling every 2 seconds/i)).toBeInTheDocument()
  })

  it('renders with proper layout styling', () => {
    const { container } = render(<DashboardLayoutWithProvider />)
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
    expect(container.querySelector('.max-w-7xl')).toBeInTheDocument()
  })

  it('has background gradient', () => {
    const { container } = render(<DashboardLayoutWithProvider />)
    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument()
  })
})
