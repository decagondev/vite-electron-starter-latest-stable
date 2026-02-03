import { useState, useEffect, useRef } from 'react';
import { BreathingTimerState } from '../types';

const PHASE_DURATIONS = {
  inhale: 4,
  hold: 7,
  exhale: 8,
};

export function useBreathingTimer() {
  const [state, setState] = useState<BreathingTimerState>({
    isActive: false,
    phase: 'idle',
    phaseTimeRemaining: 0,
    sessionDuration: 5,
    sessionTimeRemaining: 5 * 60,
    cycleCount: 0,
  });
  
  const timerRef = useRef<number | null>(null);
  
  const startSession = () => {
    setState(prev => ({
      ...prev,
      isActive: true,
      phase: 'inhale',
      phaseTimeRemaining: PHASE_DURATIONS.inhale,
      sessionTimeRemaining: prev.sessionDuration * 60,
      cycleCount: 1,
    }));
  };
  
  const stopSession = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setState(prev => ({
      ...prev,
      isActive: false,
      phase: 'idle',
      phaseTimeRemaining: 0,
    }));
  };
  
  const toggleSession = () => {
    if (state.isActive) {
      stopSession();
    } else {
      startSession();
    }
  };
  
  const setSessionDuration = (minutes: number) => {
    setState(prev => ({
      ...prev,
      sessionDuration: minutes,
      sessionTimeRemaining: minutes * 60,
    }));
  };
  
  useEffect(() => {
    if (!state.isActive) return;
    
    timerRef.current = window.setInterval(() => {
      setState(prev => {
        // Update session time
        const newSessionTimeRemaining = prev.sessionTimeRemaining - 1;
        
        // Check if session has ended
        if (newSessionTimeRemaining <= 0) {
          clearInterval(timerRef.current!);
          return {
            ...prev,
            isActive: false,
            phase: 'idle',
            sessionTimeRemaining: 0,
            phaseTimeRemaining: 0,
          };
        }
        
        // Update phase time
        let newPhaseTimeRemaining = prev.phaseTimeRemaining - 1;
        let newPhase = prev.phase;
        let newCycleCount = prev.cycleCount;
        
        // Check if phase has ended
        if (newPhaseTimeRemaining <= 0) {
          // Transition to next phase
          if (prev.phase === 'inhale') {
            newPhase = 'hold';
            newPhaseTimeRemaining = PHASE_DURATIONS.hold;
          } else if (prev.phase === 'hold') {
            newPhase = 'exhale';
            newPhaseTimeRemaining = PHASE_DURATIONS.exhale;
          } else if (prev.phase === 'exhale') {
            newPhase = 'inhale';
            newPhaseTimeRemaining = PHASE_DURATIONS.inhale;
            newCycleCount = prev.cycleCount + 1;
          }
        }
        
        return {
          ...prev,
          phase: newPhase,
          phaseTimeRemaining: newPhaseTimeRemaining,
          sessionTimeRemaining: newSessionTimeRemaining,
          cycleCount: newCycleCount,
        };
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isActive]);
  
  return {
    state,
    toggleSession,
    setSessionDuration,
  };
}