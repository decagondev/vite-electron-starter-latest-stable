import { useBreathingTimer } from './hooks/useBreathingTimer';
import { BreathingCircle } from './components/BreathingCircle';
import { ControlPanel } from './components/ControlPanel';
import { ProgressInfo } from './components/ProgressInfo';

export function App() {
  const { state, toggleSession, setSessionDuration } = useBreathingTimer();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">4-7-8 Breathing Exercise</h1>
        
        <BreathingCircle 
          phase={state.phase} 
          timeRemaining={state.phaseTimeRemaining} 
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