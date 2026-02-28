import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, Sparkles, Copy, Save, RotateCcw } from 'lucide-react';
import { aiAPI } from '../utils/api';
import LoadingDots from '../components/layout/LoadingDots';
import toast from 'react-hot-toast';

const SummarizePage = ({ onSaveNote }) => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const summarize = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setSummary('');
    try {
      const { data } = await aiAPI.summarize(text);
      setSummary(data.summary);
    } catch {
      toast.error('Failed to summarize. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast.success('Copied to clipboard!');
  };

  const saveNote = () => {
    if (!summary) return;
    onSaveNote({
      title: title || `Summary — ${new Date().toLocaleDateString()}`,
      content: text,
      summary,
      tags: ['summary'],
    });
    setTitle('');
  };

  const reset = () => { setText(''); setSummary(''); setTitle(''); };

  return (
    <div className="p-8 w-full animate-fade-in">
      <div className={`grid gap-6 ${summary ? 'grid-cols-[1fr_2fr]' : 'grid-cols-1'}`}>
        {/* Input panel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="section-label">Your Notes</label>
            <span className="text-xs text-ink-300">{wordCount} words</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your lecture notes, textbook excerpts, or any study material here…"
            className="textarea-base"
            rows={14}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={summarize}
              disabled={!text.trim() || loading}
              className="btn-primary flex-1"
            >
              {loading ? (
                <LoadingDots size="sm" label="Summarizing..." />
              ) : (
                <>
                  <Sparkles size={15} />
                  Summarize Notes
                </>
              )}
            </button>
            {(text || summary) && (
              <button onClick={reset} className="btn-secondary">
                <RotateCcw size={14} />
                Reset
              </button>
            )}
          </div>
          {wordCount > 0 && wordCount < 50 && (
            <p className="text-xs text-amber-accent flex items-center gap-1">
              ⚠️ Add more text for a better summary (min ~50 words recommended)
            </p>
          )}
        </div>

        {/* Output panel */}
        {(summary || loading) && (
          <div className="space-y-3 animate-slide-up">
            <div className="flex items-center justify-between">
              <label className="section-label flex items-center gap-1.5">
                <FileText size={11} />
                AI Summary
              </label>
              {summary && (
                <div className="flex gap-1">
                  <button onClick={copyToClipboard} className="btn-ghost py-1 px-2 text-xs">
                    <Copy size={12} /> Copy
                  </button>
                </div>
              )}
            </div>

            <div className="card p-4 min-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <LoadingDots label="Generating summary..." />
                </div>
              ) : (
                <div className="ai-prose text-sm text-ink-700 leading-relaxed">
                  <ReactMarkdown>{summary}</ReactMarkdown>
                </div>
              )}
            </div>

            {summary && (
              <div className="space-y-2">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give this note a title (optional)"
                  className="input-base text-sm"
                />
                <button onClick={saveNote} className="btn-primary w-full">
                  <Save size={14} />
                  Save to Notes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Empty state tip */}
      {!summary && !loading && (
        <div className="mt-8 p-4 rounded-xl bg-cream-100 border border-ink-100/50">
          <p className="text-xs text-ink-500 leading-relaxed">
            <strong className="text-ink-700">💡 How it works:</strong> Paste any text — lecture notes, articles, or textbook pages —
            and the AI will extract the key points as a structured bullet summary. Works best with 100–2000 words.
          </p>
        </div>
      )}
    </div>
  );
};

export default SummarizePage;
