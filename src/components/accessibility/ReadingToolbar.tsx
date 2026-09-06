import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ttsService } from '../../services/ttsService';
import { Play, Pause, Square, Volume2, Gauge, Target } from 'lucide-react';

export const ReadingToolbar: React.FC = () => {
  const { isReading, setIsReading, activeTargetLabel, profile, updateProfile } = useAccessibility();
  const [rate, setRate] = useState(profile.readingSpeed || 1.0);

  if (!isReading) return null;

  const handlePauseToggle = () => {
    if (ttsService.isSpeaking()) {
      ttsService.pause();
    } else if (ttsService.isPaused()) {
      ttsService.resume();
    }
  };

  const handleStop = () => {
    ttsService.stop();
    setIsReading(false);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setRate(newSpeed);
    updateProfile({ readingSpeed: newSpeed });
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-40 flex flex-col md:flex-row items-start md:items-center gap-3 p-3.5 bg-slate-900/95 text-white rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700 animate-slideUp max-w-md">
      <div className="flex items-center gap-2 pr-2 border-r-0 md:border-r border-slate-700 w-full md:w-auto justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
          <div>
            <span className="text-xs font-bold block leading-none">Specific Target Audio Reader</span>
            {activeTargetLabel && (
              <span className="text-[10px] text-amber-300 font-semibold block mt-0.5 line-clamp-1">
                🎯 {activeTargetLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto justify-between pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePauseToggle}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
            aria-label={ttsService.isPaused() ? 'Resume Audio Reader' : 'Pause Audio Reader'}
          >
            {ttsService.isPaused() ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handleStop}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            aria-label="Stop Audio Reader"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>

        {/* Reading Speed Selector */}
        <div className="flex items-center gap-1 text-xs">
          <Gauge className="w-4 h-4 text-slate-400" />
          {[0.75, 1.0, 1.25, 1.5].map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`px-2 py-0.5 rounded font-medium transition ${
                rate === s ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
