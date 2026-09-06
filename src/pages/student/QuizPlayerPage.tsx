import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ttsService } from '../../services/ttsService';
import { aiService } from '../../services/aiService';
import { Clock, Volume2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const QuizPlayerPage: React.FC = () => {
  const { quizId } = useParams();
  const { quizzes, submitQuizAttempt } = useData();
  const { profile } = useAccessibility();
  const navigate = useNavigate();

  const quiz = quizzes.find((q) => q.id === quizId) || quizzes[0];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quiz.questions.length).fill(-1)
  );
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = quiz.questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentIdx] = optIdx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleListenQuestion = () => {
    const textToSpeak = `${currentQ.questionText}. Options are: ${currentQ.options.join(', ')}`;
    ttsService.speak(textToSpeak, profile.readingSpeed || 1.0);
  };

  const handleSubmit = async () => {
    // Score calculation
    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctOptionIndex) correctCount++;
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);

    const weakTopics = scorePercent < 100 ? ['Discriminant Boundary Properties (Δ < 0)'] : [];
    const aiAnalysisResult = await aiService.analyzeQuizPerformance(scorePercent, weakTopics);

    const attempt = submitQuizAttempt({
      quizId: quiz.id,
      quizTitle: quiz.title,
      studentId: 'user_student_1',
      scorePercent,
      answers: selectedAnswers,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      aiAnalysis: {
        overallSummary: aiAnalysisResult.summary,
        weakTopics,
        strengths: ['Quadratic Formula Application'],
        recommendedRevision: aiAnalysisResult.recommendation,
      },
    });

    navigate(`/student/quizzes/${quiz.id}/results?attemptId=${attempt.id}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Shell title={`Quiz: ${quiz.title}`}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Progress & Timer Bar */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Question {currentIdx + 1} of {quiz.questions.length}
          </div>

          <button
            onClick={handleListenQuestion}
            className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl text-xs flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4" /> Listen Question
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
            {currentQ.questionText}
          </h2>

          {/* Answer Choice Cards */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-white bg-white text-indigo-600 font-bold' : 'border-slate-400'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-current" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Quiz Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentIdx === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-sm flex items-center gap-2"
            >
              <span>Submit Assessment</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Shell>
  );
};
