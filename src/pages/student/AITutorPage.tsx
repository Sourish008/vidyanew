import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { aiService, AIChatOutput } from '../../services/aiService';
import { ttsService } from '../../services/ttsService';
import {
  Bot,
  Send,
  Mic,
  Volume2,
  HelpCircle,
  Globe,
  Bookmark,
  Sparkles,
  Check,
  AlertCircle,
  User,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  data?: AIChatOutput;
}

// Lightweight renderer: converts basic Markdown (headings, bold, lists)
// and renders LaTeX math ($...$ and $$...$$) using KaTeX to cleanly display formulas.
function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderAIContentToHtml(input: string) {
  if (!input) return '';

  let html = input;

  // Render block math $$...$$ first
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_m, expr) => {
    try {
      return katex.renderToString(expr.trim(), { displayMode: true, throwOnError: false });
    } catch (e) {
      return `<pre>${escapeHtml(expr)}</pre>`;
    }
  });

  // Render inline math $...$
  html = html.replace(/\$([^$\n]+?)\$/g, (_m, expr) => {
    try {
      return katex.renderToString(expr.trim(), { displayMode: false, throwOnError: false });
    } catch (e) {
      return `<code>${escapeHtml(expr)}</code>`;
    }
  });

  // Basic markdown conversions: headings, bold, lists, paragraphs
  // Headings: ###, ##, #
  html = html.replace(/^###\s*(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s*(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s*(.+)$/gm, '<h1>$1</h1>');

  // Normalize heading levels: promote first H3 to H2 to avoid skipping from page H1 -> H3
  html = html.replace(/<h3>/, '<h2>');

  // Bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Unordered lists: lines starting with - or *
  // Convert consecutive list lines into a single <ul>
  html = html.replace(/(^((?:[-*]\s+.+\n?)+))/gm, (m) => {
    const items = m
      .trim()
      .split(/\n+/)
      .map((l) => l.replace(/^[-*]\s+/, ''))
      .map((li) => `<li>${li}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  // Preserve existing line breaks into paragraphs
  html = html
    .split(/\n\s*\n/)
    .map((block) => {
      // if the block already contains block-level tags, keep it
      if (/^\s*<h|<ul|<pre|<h1|<h2|<h3|<table/.test(block)) return block;
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');

  return html;
}

export const AITutorPage: React.FC = () => {
  const { saveNote } = useData();
  const { profile, setIsReading, setIsVoiceModalOpen } = useAccessibility();

  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'ai',
      text: "Hello Alex! I am your Vidya AI Tutor. How can I help you learn today?",
      data: {
        id: 'init_data',
        role: 'assistant',
        content: `### Welcome to Vidya AI Tutor Workspace 👋

I can assist you with:
- **Explanations**: Step-by-step math proofs, physics laws, and programming concepts.
- **Simplification**: Lowering text difficulty to Class 8 or Very Easy level.
- **Hindi Translation**: Instant translation between English and Hindi.
- **Practice**: Generating instant practice questions.

*Ask a question below or select one of the starter prompts!*`,
        suggestedFollowups: [
          'Explain quadratic formula step-by-step',
          'Kinetic energy vs potential energy',
          'WCAG accessibility principles',
        ],
      },
    },
  ]);

  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set());

  const handleSend = async (userText?: string) => {
    const textToSend = userText || inputMsg;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInputMsg('');
    setLoading(true);

    try {
      const output = await aiService.generateResponse({
        message: textToSend,
        language: profile.preferredSupport.includes('Hindi') ? 'hi' : 'en',
      });

      const aiMsg: ChatMessage = {
        id: output.id,
        sender: 'ai',
        text: output.content,
        data: output,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleListen = (text: string) => {
    setIsReading(true);
    ttsService.speak(text, profile.readingSpeed || 1.0, undefined, () => setIsReading(false));
  };

  const handleSaveToNotes = (msgId: string, title: string, content: string) => {
    saveNote(title, content, 'ai_tutor');
    setSavedMessageIds((prev) => new Set(prev).add(msgId));
  };

  return (
    <Shell title="AI Tutor Workspace">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 space-y-6 flex flex-col h-[calc(100vh-12rem)] overflow-x-hidden">
        {/* Chat Messages Container */}
        <div className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 w-full min-w-0 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div className={`w-full max-w-full sm:max-w-2xl space-y-3 min-w-0 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                <div
                  className={`p-5 rounded-3xl shadow-sm text-sm break-words max-w-full ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p>{msg.text}</p>
                  ) : (
                    <div className="space-y-4">
                      {/* Document-styled content rendering */}
                      <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed break-words">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: renderAIContentToHtml(msg.text),
                          }}
                        />
                      </div>

                      {/* MathML Display if formula present */}
                      {msg.data?.mathMl && (
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900 text-center my-2">
                          <div
                            className="text-xl font-serif"
                            dangerouslySetInnerHTML={{ __html: msg.data.mathMl }}
                          />
                        </div>
                      )}

                      {/* Structured Table Display if present */}
                      {msg.data?.tableData && (
                        <div className="overflow-x-auto my-3 border border-slate-200 dark:border-slate-700 rounded-2xl">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold">
                              <tr>
                                {msg.data.tableData.headers.map((h, i) => (
                                  <th key={i} className="p-2.5">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                              {msg.data.tableData.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-2.5 text-slate-700 dark:text-slate-300">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Uncertainty Warning Box if applicable */}
                      {msg.data?.uncertaintyWarning && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-300 rounded-xl text-xs flex items-center gap-2 font-medium">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{msg.data.uncertaintyWarning}</span>
                        </div>
                      )}

                      {/* Response Action Bar (Listen, Save, Followups) */}
                      {msg.sender === 'ai' && (
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleListen(msg.text)}
                              className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg flex items-center gap-1 hover:bg-indigo-100 transition"
                            >
                              <Volume2 className="w-3.5 h-3.5" /> Listen
                            </button>

                            <button
                              onClick={() =>
                                handleSaveToNotes(msg.id, 'AI Tutor Solution', msg.text)
                              }
                              className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-lg flex items-center gap-1 hover:bg-slate-200 transition"
                            >
                              {savedMessageIds.has(msg.id) ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Saved
                                </>
                              ) : (
                                <>
                                  <Bookmark className="w-3.5 h-3.5 text-indigo-600" /> Save Note
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Suggested Followups */}
                {msg.data?.suggestedFollowups && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.data.suggestedFollowups.map((f, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleSend(f)}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700 transition"
                      >
                        ⚡ {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl w-48 animate-pulse text-xs font-semibold text-slate-500">
              <Bot className="w-4 h-4 text-indigo-600 animate-spin" /> Vidya AI is thinking...
            </div>
          )}
        </div>

        {/* Input Composer Bar */}
            <div className="p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="p-3 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Voice Input Assistant"
            >
              <Mic className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask Vidya anything about your lessons, math formulas, or physics laws..."
              className="flex-1 min-w-0 px-3 py-2 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputMsg.trim() || loading}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md shadow-indigo-600/30 disabled:opacity-40 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </Shell>
  );
};
