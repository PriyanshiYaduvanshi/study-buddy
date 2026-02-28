import React from 'react';
import { MessageSquare, FileText, Layers, BookOpen, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 'explain',
    icon: MessageSquare,
    label: 'Explain a Concept',
    desc: 'Ask anything, get a crystal-clear ELI5 explanation with analogies and examples.',
    color: 'bg-sky-light text-sky-accent',
    badge: null,
  },
  {
    id: 'summarize',
    icon: FileText,
    label: 'Summarize Notes',
    desc: 'Paste your lecture notes or textbook excerpts and get sharp bullet-point summaries.',
    color: 'bg-sage-light text-sage-accent',
    badge: null,
  },
  {
    id: 'quiz',
    icon: Layers,
    label: 'Generate a Quiz',
    desc: 'Turn any study material into 5 MCQ practice questions to test your knowledge.',
    color: 'bg-rose-light text-rose-accent',
    badge: null,
  },
  {
    id: 'notes',
    icon: BookOpen,
    label: 'Saved Notes',
    desc: 'Browse and manage your saved summaries, notes, and study materials.',
    color: 'bg-amber-light text-amber-accent',
    badge: null,
  },
];

const HomePage = ({ onNavigate, noteCount }) => {
  return (
    <div className="p-8 w-full animate-fade-in">
      {/* Hero */}
      <div className="mb-8">
        <p className="text-ink-300 text-sm mb-1">Welcome back 👋</p>
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-2 leading-tight">
          Your AI-powered<br />
          <span className="italic font-light">study companion.</span>
        </h1>
        <p className="text-ink-500 text-sm leading-relaxed max-w-md">
          Understand complex topics, condense your notes, and quiz yourself — all powered by AI.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {features.map(({ id, icon: Icon, label, desc, color, badge }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="card p-5 text-left hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={17} />
              </div>
              {badge && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-ink-900 text-cream-50">
                  {badge}
                </span>
              )}
            </div>
            <h3 className="font-medium text-ink-900 text-sm mb-1">{label}</h3>
            <p className="text-xs text-ink-400 leading-relaxed mb-3">{desc}</p>
            <span className="inline-flex items-center gap-1 text-xs text-ink-300 group-hover:text-ink-700 transition-colors">
              Get started <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        ))}
      </div>

      {/* Saved notes quick count */}
      {noteCount > 0 && (
        <button
          onClick={() => onNavigate('notes')}
          className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-xl bg-cream-100 hover:bg-cream-200 transition-colors group"
        >
          <span className="text-sm text-ink-700">
            You have <strong className="font-semibold text-ink-900">{noteCount} saved notes</strong>
          </span>
          <ArrowRight size={14} className="text-ink-300 group-hover:text-ink-700 group-hover:translate-x-0.5 transition-all" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
