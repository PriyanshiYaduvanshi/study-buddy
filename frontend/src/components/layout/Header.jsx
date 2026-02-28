import React from 'react';
import { Sparkles, MessageSquare, FileText, Layers, BookOpen } from 'lucide-react';

const pageConfig = {
  home: { title: 'Good to see you', subtitle: 'What would you like to learn today?', icon: Sparkles, color: 'text-amber-accent' },
  explain: { title: 'Explain a Concept', subtitle: 'Get ELI5-style breakdowns of any topic', icon: MessageSquare, color: 'text-sky-accent' },
  summarize: { title: 'Note Summarizer', subtitle: 'Turn dense notes into clear bullet points', icon: FileText, color: 'text-sage-accent' },
  quiz: { title: 'Quiz Generator', subtitle: 'Generate practice MCQs from your notes', icon: Layers, color: 'text-rose-accent' },
  notes: { title: 'Saved Notes', subtitle: 'Your personal knowledge library', icon: BookOpen, color: 'text-amber-accent' },
};

const Header = ({ activePage }) => {
  const config = pageConfig[activePage] || pageConfig.home;
  const Icon = config.icon;

  return (
    <header className="px-8 py-6 border-b border-ink-100/50 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg bg-cream-100 flex items-center justify-center ${config.color}`}>
          <Icon size={18} />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-900 leading-tight">{config.title}</h2>
          <p className="text-xs text-ink-300 leading-tight mt-0.5">{config.subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
