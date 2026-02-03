/**
 * Breathing feature type definitions
 * Contains all types related to the breathing exercise functionality
 */

/**
 * Represents the current phase of a breathing cycle
 */
export type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'idle';

/**
 * Complete state of the breathing timer
 */
export interface BreathingTimerState {
  /** Whether the breathing session is currently active */
  isActive: boolean;
  /** Current phase of the breathing cycle */
  phase: BreathingPhase;
  /** Time remaining in the current phase (seconds) */
  phaseTimeRemaining: number;
  /** Total session duration (minutes) */
  sessionDuration: number;
  /** Time remaining in the session (seconds) */
  sessionTimeRemaining: number;
  /** Number of completed breathing cycles */
  cycleCount: number;
}

/**
 * Props for the BreathingCircle component
 */
export interface BreathingCircleProps {
  /** Current breathing phase */
  phase: BreathingPhase;
  /** Time remaining in the current phase */
  timeRemaining: number;
}

/**
 * Props for the ControlPanel component
 */
export interface ControlPanelProps {
  /** Whether the session is currently active */
  isActive: boolean;
  /** Current session duration setting (minutes) */
  sessionDuration: number;
  /** Callback to toggle the session on/off */
  onToggle: () => void;
  /** Callback to change the session duration */
  onDurationChange: (duration: number) => void;
}

/**
 * Props for the ProgressInfo component
 */
export interface ProgressInfoProps {
  /** Number of completed breathing cycles */
  cycleCount: number;
  /** Time remaining in the session (seconds) */
  timeRemaining: number;
}
