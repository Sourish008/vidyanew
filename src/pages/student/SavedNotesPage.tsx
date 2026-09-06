import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { Bookmark, Trash2, Volume2, Sparkles } from 'lucide-react';
import { ttsService } from '../../services/ttsService';
import { useAccessibility } from '../../context/AccessibilityContext';

export const SavedNotesPage: React.FC = () => {
  const { notes, deleteNote } = useData();
  const { profile, setIsReading } = useAccessibility();

  const handleListenNote = (content: string) => {
    setIsReading(true);
    ttsService.speak(content, profile.readingSpeed || 1.0, undefined, () => setIsReading(false));
  };

  return (
    <Shell title="Saved Study Notes">
      <div className="space-y-6">
        {notes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No saved notes yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Save explanations from your AI Tutor or lesson pages to build a personal study repository.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md">
                      {note.sourceType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleListenNote(note.content)}
                    className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-indigo-100 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
};
