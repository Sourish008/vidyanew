import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import confetti from 'canvas-confetti';
import { Award, Bot, BookOpen, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

export const QuizResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get('attemptId');
  const { attempts, quizzes } = useData();
  const navigate = useNavigate();

  const attempt = attempts.find((a) => a.id === attemptId) || attempts[0];
  const quiz = quizzes.find((q) => q.id === attempt?.quizId) || quizzes[0];

  useEffect(() => {
    if (attempt && attempt.scorePercent >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [attempt]);

  if (!attempt) {
    return (
      <Shell title="Quiz Results">
        <p>No attempt records found.</p>
      </Shell>
    );
  }

  return (
    <Shell title={`Results: ${quiz.title}`}>
      <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
        {/* Score Hero Card - Flat Solid Surface */}
        <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl p-8 border border-[#CBD5E1] dark:border-slate-800 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#1F2937] dark:text-[#F8FAFC]">
              {attempt.scorePercent >= 80 ? 'Great job, Alex! 🎉' : 'Assessment Complete'}
            </h2>
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{quiz.title}</p>
          </div>

          <div className="inline-block p-6 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-[#CBD5E1] dark:border-slate-700">
            <span className="text-5xl font-black text-[#4F46E5]">
              {attempt.scorePercent}%
            </span>
            <span className="block text-xs font-bold text-[#64748B] mt-1 uppercase tracking-wider">
              Overall Accuracy Score
            </span>
          </div>
        </div>

        {/* AI Quiz Analysis Block - Flat Solid Primary Indigo #4F46E5 */}
        <div className="bg-[#4F46E5] text-[#FFFFFF] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-lg font-bold">Vidya AI Learning Analysis</h3>
          </div>

          <p className="text-sm text-indigo-100 leading-relaxed">
            {attempt.aiAnalysis?.overallSummary || 'Solid understanding of quadratic formula applications!'}
          </p>

          {attempt.aiAnalysis?.recommendedRevision && (
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs space-y-2">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">
                Recommended Action:
              </span>
              <p className="text-indigo-50 font-medium">
                {attempt.aiAnalysis.recommendedRevision}
              </p>
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/student/ai-tutor"
              className="px-5 py-2.5 bg-white text-[#1F2937] font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm hover:bg-indigo-50 transition"
            >
              <Bot className="w-4 h-4 text-[#4F46E5]" />
              <span>Ask AI Tutor to Explain Weak Topics</span>
            </Link>

            <Link
              to="/student/courses"
              className="px-5 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Review Lesson</span>
            </Link>
          </div>
        </div>

        {/* Question-by-Question Breakdown */}
        <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#F8FAFC]">Question Breakdown</h3>

          <div className="space-y-4">
            {quiz.questions.map((q, idx) => {
              const studentAns = attempt.answers[idx];
              const isCorrect = studentAns === q.correctOptionIndex;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    isCorrect
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200'
                      : 'bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-[#1F2937] dark:text-[#F8FAFC] text-sm">
                      {idx + 1}. {q.questionText}
                    </p>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
                    )}
                  </div>

                  <p className="text-[#64748B] dark:text-[#94A3B8] font-medium">
                    Your Answer: {studentAns >= 0 ? q.options[studentAns] : 'Not Answered'}
                  </p>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-[#94A3B8]">
                    <span className="font-bold text-[#1F2937] dark:text-[#F8FAFC]">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Shell>
  );
};
