/**
 * Breathing feature barrel export
 * Provides a clean public API for the breathing feature
 */

export { BreathingCircle } from './components/BreathingCircle';
export { ControlPanel } from './components/ControlPanel';
export { ProgressInfo } from './components/ProgressInfo';
export { useBreathingTimer } from './hooks/useBreathingTimer';
export type {
  BreathingPhase,
  BreathingTimerState,
  BreathingCircleProps,
  ControlPanelProps,
  ProgressInfoProps,
} from './types/breathing.types';
