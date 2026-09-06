import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Loader2 } from 'lucide-react';

export const MaterialProcessingPage: React.FC = () => {
  const { resourceId } = useParams();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const { processingJobs, materials } = useData();
  const navigate = useNavigate();

  const job = processingJobs.find((j) => j.id === jobId || j.resourceId === resourceId) || processingJobs[0];
  const material = materials.find((m) => m.id === resourceId) || materials[0];

  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const steps = [
    { title: 'Content extracted', done: true },
    { title: 'Images & equations detected', done: true },
    { title: 'Structure optimized', done: true },
    { title: 'Accessibility conversion', done: job.status === 'ready_for_review' || job.status === 'approved' },
    { title: 'Final review & teacher sign-off', done: job.status === 'approved' },
  ];

  return (
    <Shell title="AI Accessibility Processing Status">
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Job Identifier: {job?.id}</span>
            </div>

            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {job?.status.replace('_', ' ')}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {material?.title || job?.resourceTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{job?.currentStep}</p>
          </div>

          {/* Visual Stepper */}
          <div className="py-4 space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm font-semibold">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    step.done
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={step.done ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Action button if ready for review */}
          {job?.status === 'ready_for_review' && (
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-purple-900 dark:text-purple-200">
                  Processing Complete!
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-400">
                  Model confidence score: 95%. Open Accessibility Review Console to inspect alt descriptions & MathML.
                </p>
              </div>

              <button
                onClick={() => navigate(`/teacher/materials/${material.id}/review`)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 text-xs flex items-center gap-2 shrink-0"
              >
                <span>Open Review Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Collapsible View Technical Details Drawer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="flex items-center justify-between w-full text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <span>View Technical Details</span>
              {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showTechnicalDetails && (
              <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs space-y-2 font-mono text-slate-700 dark:text-slate-300">
                <p>Extraction Engine: {job.technicalDetails.extractionEngine}</p>
                <p>Parsed DOM Nodes: {job.technicalDetails.parsedNodes}</p>
                <p>Detected Visual Images: {job.technicalDetails.detectedImages}</p>
                <p>Detected Math Equations: {job.technicalDetails.detectedEquations}</p>
                <p>Model Confidence Rating: {job.technicalDetails.modelConfidenceScore * 100}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
};
