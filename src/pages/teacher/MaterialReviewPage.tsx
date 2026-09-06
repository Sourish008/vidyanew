import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import {
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Calculator,
  ListTree,
  Subtitles,
  RotateCcw,
  Check,
} from 'lucide-react';

export const MaterialReviewPage: React.FC = () => {
  const { resourceId } = useParams();
  const { materials, approveMaterialContent } = useData();
  const navigate = useNavigate();

  const material = materials.find((m) => m.id === resourceId) || materials[0];
  const generated = material.generatedContent || {
    imageDescription: 'Parabola curve y = x² - 4x + 3 intersecting x-axis at (1,0) and (3,0).',
    mathMl: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#x2213;</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>`,
    spokenMath: 'x equals negative b plus or minus square root of b squared minus 4 a c over 2 a.',
    screenReaderStructure: 'Heading 1: Proof. Heading 2: Worked Examples.',
    transcript: 'Extracted plain text for audio reader.',
    confidence: 0.94,
    teacherApproved: false,
  };

  const [activeTab, setActiveTab] = useState<'image' | 'math' | 'structure' | 'transcript'>('image');
  const [imageDesc, setImageDesc] = useState(generated.imageDescription || '');
  const [mathMl, setMathMl] = useState(generated.mathMl || '');
  const [spokenMath, setSpokenMath] = useState(generated.spokenMath || '');
  const [transcript, setTranscript] = useState(generated.transcript || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleApprove = () => {
    approveMaterialContent(material.id, {
      ...generated,
      imageDescription: imageDesc,
      mathMl,
      spokenMath,
      transcript,
      teacherApproved: true,
    });

    setIsSaved(true);
    setTimeout(() => {
      navigate('/teacher/materials');
    }, 1200);
  };

  return (
    <Shell title="Accessibility Review Console">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded">
                Accessibility Review
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {material.title}
              </h2>
              <p className="text-xs text-slate-500">
                Review and edit AI generated accessibility outputs before publishing to students. Original file is preserved.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleApprove}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 text-xs transition"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Approved & Published!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Save</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 dark:border-slate-800 pb-2">
            {[
              { id: 'image', label: 'Image Alt Description', icon: ImageIcon },
              { id: 'math', label: 'MathML & Spoken Math', icon: Calculator },
              { id: 'structure', label: 'Screen Reader Structure', icon: ListTree },
              { id: 'transcript', label: 'Captions & Transcript', icon: Subtitles },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Editor */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            {activeTab === 'image' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Editable Image Description (Alt Text)
                </label>
                <textarea
                  value={imageDesc}
                  onChange={(e) => setImageDesc(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:border-purple-500 focus:outline-none"
                />
              </div>
            )}

            {activeTab === 'math' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    MathML Code Representation
                  </label>
                  <textarea
                    value={mathMl}
                    onChange={(e) => setMathMl(e.target.value)}
                    rows={4}
                    className="w-full p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Spoken Math Text Equivalent
                  </label>
                  <input
                    type="text"
                    value={spokenMath}
                    onChange={(e) => setSpokenMath(e.target.value)}
                    className="w-full p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'structure' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Screen Reader Heading Hierarchy
                </label>
                <p className="text-xs text-slate-500">
                  {generated.screenReaderStructure || 'Heading 1: Title, Heading 2: Proof, Heading 3: Exercises.'}
                </p>
              </div>
            )}

            {activeTab === 'transcript' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Editable Video/Audio Transcript
                </label>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={5}
                  className="w-full p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium focus:border-purple-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
};
