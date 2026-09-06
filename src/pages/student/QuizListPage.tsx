import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { HelpCircle, Clock, Award, ArrowRight } from 'lucide-react';

export const QuizListPage: React.FC = () => {
  const { quizzes, attempts } = useData();

  return (
    <Shell title="Quizzes & Practice Assessments">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const attempt = attempts.find((a) => a.quizId === quiz.id);

            return (
              <div
                key={quiz.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md">
                    {quiz.courseTitle}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {quiz.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1 font-semibold">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    {quiz.questions.length} Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {Math.round(quiz.timeLimitSeconds / 60)} mins limit
                  </span>
                </div>

                {attempt ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold block">
                        Completed — Score: {attempt.scorePercent}%
                      </span>
                      <span className="text-[10px] text-emerald-600">AI analysis available</span>
                    </div>
                    <Link
                      to={`/student/quizzes/${quiz.id}/results?attemptId=${attempt.id}`}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                    >
                      View Results
                    </Link>
                  </div>
                ) : (
                  <Link
                    to={`/student/quizzes/${quiz.id}/take`}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition text-sm"
                  >
                    <span>Start Practice Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
};
