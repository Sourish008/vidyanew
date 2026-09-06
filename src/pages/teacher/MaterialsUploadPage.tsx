import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { contentProcessingService } from '../../services/contentProcessingService';
import { ResourceType } from '../../types';
import { UploadCloud, FileText, Video, Image, FileCode, Music, Sparkles } from 'lucide-react';

export const MaterialsUploadPage: React.FC = () => {
  const { courses, addMaterial } = useData();
  const navigate = useNavigate();

  const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);
  const [fileTitle, setFileTitle] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('pdf');
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileTitle.trim()) return;

    setIsUploading(true);
    const targetCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
    const resourceId = `res_${Date.now()}`;

    // Add material item to state
    const newMaterial = {
      id: resourceId,
      courseId: targetCourse.id,
      courseTitle: targetCourse.title,
      title: fileTitle,
      resourceType,
      fileSizeBytes: 3500000,
      accessibilityStatus: 'processing' as const,
      uploadedAt: new Date().toISOString(),
    };

    addMaterial(newMaterial);

    // Kick off asynchronous content processing pipeline
    const job = await contentProcessingService.processResourceUpload(
      resourceId,
      fileTitle,
      resourceType
    );

    setIsUploading(false);
    navigate(`/teacher/materials/${resourceId}/processing?jobId=${job.id}`);
  };

  return (
    <Shell title="Upload Teaching Material">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>AI Multimodal Accessibility Conversion Pipeline</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Upload Material for Course
            </h2>
            <p className="text-xs text-slate-500">
              Upload PDFs, videos, images, or documents. Vidya automatically extracts text, parses equations into MathML, generates visual alt descriptions, and creates transcripts.
            </p>
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-6">
            {/* Target Course Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Select Target Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-purple-500 text-sm font-semibold"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.gradeLevel})
                  </option>
                ))}
              </select>
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Material Title / Display Name
              </label>
              <input
                type="text"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
                placeholder="e.g. Chapter 4 — Quadratic Roots & Proof Sheet.pdf"
                className="w-full p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-purple-500 text-sm font-semibold"
                required
              />
            </div>

            {/* Resource Type Selector Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Resource Format Type
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { id: 'pdf', label: 'PDF', icon: FileText },
                  { id: 'video', label: 'Video', icon: Video },
                  { id: 'image', label: 'Image', icon: Image },
                  { id: 'doc', label: 'Document', icon: FileCode },
                  { id: 'audio', label: 'Audio', icon: Music },
                  { id: 'presentation', label: 'Slides', icon: FileText },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setResourceType(t.id as any)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition ${
                        resourceType === t.id
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Central Drag and Drop Zone + Browse Files Button */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center space-y-4 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-purple-50/50 transition">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto shadow-sm">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div>
                <p className="font-extrabold text-base text-slate-900 dark:text-white">
                  Drag and drop files here to upload
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PDF, MP4, PNG, JPG, DOCX up to 100MB
                </p>
              </div>

              <div className="pt-2">
                <label className="px-6 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs cursor-pointer inline-block transition">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileTitle(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!fileTitle.trim() || isUploading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-2xl shadow-xl shadow-purple-600/30 disabled:opacity-40 transition flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-5 h-5" />
              <span>
                {isUploading ? 'Uploading & Extracting...' : 'Start AI Accessibility Conversion'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </Shell>
  );
};
