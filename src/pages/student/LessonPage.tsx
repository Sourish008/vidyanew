import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ttsService, WordHighlightRange } from '../../services/ttsService';
import { aiService } from '../../services/aiService';
import {
  Volume2,
  HelpCircle,
  Globe,
  Bookmark,
  ArrowLeft,
  CheckCircle2,
  Play,
  Sparkles,
  Check,
  Subtitles,
  Target,
  BookOpenCheck,
} from 'lucide-react';

export const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams();
  const { courses, saveNote } = useData();
  const { profile, speakSpecificTarget, updateProfile } = useAccessibility();

  const course = courses.find((c) => c.id === courseId) || courses[0];
  const lesson =
    course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId) ||
    course.modules[0].lessons[0];

  const [highlightRange, setHighlightRange] = useState<WordHighlightRange | null>(null);
  const [activeTargetId, setActiveTargetId] = useState<string | null>(null);
  const [simplifiedLevel, setSimplifiedLevel] = useState<string | null>(null);
  const [simplifiedText, setSimplifiedText] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // Read full lesson content
  const handleReadFullLesson = () => {
    setActiveTargetId('full');
    const textToSpeak = simplifiedText || translatedText || lesson.content;
    speakSpecificTarget(
      textToSpeak,
      'Full Lesson Content',
      (range) => setHighlightRange(range),
      () => {
        setHighlightRange(null);
        setActiveTargetId(null);
      }
    );
  };

  // Read a SPECIFIC targeted section
  const handleReadSpecificSection = (sectionText: string, targetLabel: string, targetId: string) => {
    setActiveTargetId(targetId);
    speakSpecificTarget(
      sectionText,
      targetLabel,
      (range) => setHighlightRange(range),
      () => {
        setHighlightRange(null);
        setActiveTargetId(null);
      }
    );
  };

  const handleSimplify = async (level: string) => {
    setSimplifiedLevel(level);
    const result = await aiService.simplifyText(lesson.content, level);
    setSimplifiedText(result);
  };

  const handleTranslate = async () => {
    if (translatedText) {
      setTranslatedText(null);
    } else {
      const res = await aiService.translateToHindi(lesson.content);
      setTranslatedText(res);
    }
  };

  const handleSaveToNotes = () => {
    saveNote(
      `Study Note: ${lesson.title}`,
      simplifiedText || translatedText || lesson.content,
      'lesson'
    );
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const renderHighlightedContent = (text: string, sectionId: string) => {
    if (!highlightRange || activeTargetId !== sectionId) return text;

    const before = text.substring(0, highlightRange.charIndex);
    const highlighted = text.substring(
      highlightRange.charIndex,
      highlightRange.charIndex + highlightRange.length
    );
    const after = text.substring(highlightRange.charIndex + highlightRange.length);

    return (
      <>
        {before}
        <mark className="bg-amber-300 dark:bg-amber-500 text-slate-900 dark:text-white font-black px-1 py-0.5 rounded transition-all shadow-sm">
          {highlighted}
        </mark>
        {after}
      </>
    );
  };

  // Split lesson content into specific targeted paragraphs for granular reading
  const paragraphs = (simplifiedText || translatedText || lesson.content)
    .split('\n\n')
    .filter((p) => p.trim().length > 0);

  return (
    <Shell title={lesson.title}>
      <div className="space-y-6">
        <Link
          to={`/student/courses/${course.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {course.title}
        </Link>

        {/* Lesson Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleReadFullLesson}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Read Entire Lesson</span>
            </button>

            <div className="relative inline-flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                <HelpCircle className="w-3.5 h-3.5 inline mr-1" /> Simplify:
              </span>
              {['Class 8 Level', 'Very Easy'].map((level) => (
                <button
                  key={level}
                  onClick={() => handleSimplify(level)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    simplifiedLevel === level
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <button
              onClick={handleTranslate}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                translatedText
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{translatedText ? 'Original (EN)' : 'Translate (HI)'}</span>
            </button>
          </div>

          <button
            onClick={handleSaveToNotes}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center gap-2 transition"
          >
            {isNoteSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Saved to Notes!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-indigo-600" />
                <span>Save to Notes</span>
              </>
            )}
          </button>
        </div>

        {/* Content & Module Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Lesson Content Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
              {simplifiedText && (
                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 text-purple-900 dark:text-purple-300 rounded-2xl text-xs flex items-center justify-between">
                  <span>✨ Showing simplified text at <strong>{simplifiedLevel}</strong></span>
                  <button
                    onClick={() => {
                      setSimplifiedText(null);
                      setSimplifiedLevel(null);
                    }}
                    className="font-bold underline"
                  >
                    Reset to original
                  </button>
                </div>
              )}

              {/* Video Player if video type */}
              {lesson.contentType === 'video' && lesson.videoUrl && (
                <div className="space-y-4">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-md">
                    <video controls src={lesson.videoUrl} className="w-full h-full object-cover">
                      <track kind="captions" srcLang="en" label="English Captions" default />
                    </video>
                  </div>
                  {lesson.transcript && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs space-y-1">
                      <span className="font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Subtitles className="w-4 h-4 text-indigo-600" /> Accessible Video Transcript
                      </span>
                      <p className="text-slate-600 dark:text-slate-400">{lesson.transcript}</p>
                    </div>
                  )}
                </div>
              )}

              {/* MathML Display & Specific Formula Breakdown Reader */}
              {lesson.mathMl && (
                <div className="p-6 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-900 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      MathML Formula & Symbol Breakdown
                    </span>

                    <button
                      onClick={() =>
                        handleReadSpecificSection(
                          lesson.spokenMath || 'x equals negative b plus or minus square root of b squared minus 4 a c over 2 a.',
                          'Specific Formula Breakdown',
                          'math_formula'
                        )
                      }
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Read Specific Formula Breakdown</span>
                    </button>
                  </div>

                  <div
                    className="text-2xl font-serif text-slate-900 dark:text-white py-2 overflow-x-auto text-center"
                    dangerouslySetInnerHTML={{ __html: lesson.mathMl }}
                  />

                  {lesson.spokenMath && (
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <span className="font-bold text-indigo-600">Spoken Math Pronunciation: </span>
                      "{renderHighlightedContent(lesson.spokenMath, 'math_formula')}"
                    </div>
                  )}
                </div>
              )}

              {/* Targeted Paragraph-by-Paragraph Reading Blocks */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpenCheck className="w-4 h-4 text-indigo-600" />
                    <span>Lesson Content & Targeted Section Readers</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    Click 🎯 on any section to hear AI read that specific part
                  </span>
                </div>

                {paragraphs.map((pText, pIdx) => {
                  const pid = `para_${pIdx}`;
                  const isCurrentTarget = activeTargetId === pid;
                  return (
                    <div
                      key={pid}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCurrentTarget
                          ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-400 shadow-md ring-2 ring-indigo-400/20'
                          : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Section {pIdx + 1}
                        </span>

                        <button
                          onClick={() =>
                            handleReadSpecificSection(
                              pText,
                              `Section ${pIdx + 1}`,
                              pid
                            )
                          }
                          className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition"
                          title="Read only this specific section"
                        >
                          <Target className="w-3.5 h-3.5" />
                          <span>Read This Section</span>
                        </button>
                      </div>

                      <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                        {renderHighlightedContent(pText, pid)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar: Specific Vocabulary & Syllabus */}
          <div className="space-y-6">
            {/* Targeted Vocabulary Callout */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Specific Vocabulary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-indigo-600 block">Discriminant (Δ)</span>
                  <span className="text-slate-500">The term b² - 4ac that determines the nature of roots.</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-indigo-600 block">Parabola Vertex</span>
                  <span className="text-slate-500">The peak minimum or maximum point of a quadratic curve.</span>
                </div>
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Course Syllabus</h3>
              <div className="space-y-2">
                {course.modules.flatMap((m) => m.lessons).map((l) => (
                  <Link
                    key={l.id}
                    to={`/student/courses/${course.id}/lessons/${l.id}`}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-medium transition ${
                      l.id === lesson.id
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {l.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Play className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span className="line-clamp-1">{l.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
