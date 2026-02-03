export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'idle';

export interface BreathingTimerState {
  isActive: boolean;
  phase: BreathingPhase;
  phaseTimeRemaining: number;
  sessionDuration: number; // in minutes
  sessionTimeRemaining: number; // in seconds
  cycleCount: number;
}

export interface BreathingCircleProps {
  phase: BreathingPhase;
  timeRemaining: number;
}

export interface ControlPanelProps {
  isActive: boolean;
  sessionDuration: number;
  onToggle: () => void;
  onDurationChange: (duration: number) => void;
}

export interface ProgressInfoProps {
  cycleCount: number;
  timeRemaining: number;
}