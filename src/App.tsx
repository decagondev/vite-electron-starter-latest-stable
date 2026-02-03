import {
  useBreathing,
  BreathingCircle,
  ControlPanel,
  ProgressInfo,
} from '@features/breathing';

/**
 * Main application component
 * Demonstrates the breathing exercise with SOLID-compliant architecture
 * Uses context for state management (Dependency Inversion)
 */
export function App() {
  const { 
    state, 
    toggleSession, 
    setSessionDuration,
    currentPhaseConfig,
  } = useBreathing();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">4-7-8 Breathing Exercise</h1>
        
        <BreathingCircle 
          phase={state.phase} 
          timeRemaining={state.phaseTimeRemaining}
          instruction={currentPhaseConfig?.instruction}
        />
        
        <ControlPanel 
          isActive={state.isActive} 
          sessionDuration={state.sessionDuration}
          onToggle={toggleSession}
          onDurationChange={setSessionDuration}
        />
        
        <ProgressInfo 
          cycleCount={state.cycleCount}
          timeRemaining={state.sessionTimeRemaining}
        />
      </div>
    </div>
  );
}