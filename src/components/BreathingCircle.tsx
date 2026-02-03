import { BreathingCircleProps } from '../types';

export function BreathingCircle({ phase, timeRemaining }: BreathingCircleProps) {
  const getCircleClasses = () => {
    const baseClasses = "flex items-center justify-center rounded-full transition-all duration-1000 ease-in-out";
    
    switch (phase) {
      case 'inhale':
        return `${baseClasses} bg-primary-light text-blue-900 animate-breathe-in`;
      case 'hold':
        return `${baseClasses} bg-primary text-blue-50 animate-hold`;
      case 'exhale':
        return `${baseClasses} bg-primary-dark text-blue-50 animate-breathe-out`;
      default:
        return `${baseClasses} bg-slate-700 text-slate-200`;
    }
  };
  
  const getInstructionText = () => {
    switch (phase) {
      case 'inhale': return 'Inhale';
      case 'hold': return 'Hold';
      case 'exhale': return 'Exhale';
      default: return 'Press Start';
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={getCircleClasses()}
        style={{ width: '200px', height: '200px' }}
      >
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">{getInstructionText()}</p>
          {phase !== 'idle' && (
            <p className="text-3xl font-mono">{timeRemaining}</p>
          )}
        </div>
      </div>
    </div>
  );
}