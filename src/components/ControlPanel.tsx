import { ControlPanelProps } from '../types';

export function ControlPanel({ 
  isActive, 
  sessionDuration, 
  onToggle, 
  onDurationChange 
}: ControlPanelProps) {
  return (
    <div className="mt-8 flex gap-4 items-center">
      <button
        onClick={onToggle}
        className={`px-6 py-2 rounded-full font-medium ${
          isActive
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {isActive ? 'Stop' : 'Start'}
      </button>
      
      <div className="flex items-center gap-2">
        <label htmlFor="duration" className="text-sm">Session:</label>
        <select
          id="duration"
          value={sessionDuration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          disabled={isActive}
          className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm"
        >
          <option value={2}>2 minutes</option>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
          <option value={15}>15 minutes</option>
        </select>
      </div>
    </div>
  );
}