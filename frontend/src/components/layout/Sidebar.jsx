import React from 'react';
import {
  BookOpen, MessageSquare, FileText, Layers,
  Sparkles, ChevronRight, GraduationCap
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Sparkles },
  { id: 'explain', label: 'Explain', icon: MessageSquare },
  { id: 'summarize', label: 'Summarizer', icon: FileText },
  { id: 'quiz', label: 'Quiz Generator', icon: Layers },
  { id: 'notes', label: 'Saved Notes', icon: BookOpen },
];

const Sidebar = ({ activePage, onNavigate, noteCount = 0 }) => {
  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col bg-cream-50 shadow-sidebar border-r border-ink-100/50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-ink-100/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center">
            <GraduationCap size={16} className="text-cream-50" />
          </div>
          <div>
            <h1 className="font-display text-base font-semibold text-ink-900 leading-tight">Study Buddy</h1>
            <p className="text-[10px] text-ink-300 font-sans leading-tight">AI Learning Assistant</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="section-label px-2 mb-3">Menu</p>
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-ink-900 text-cream-50'
                  : 'text-ink-500 hover:text-ink-900 hover:bg-cream-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={15} className={isActive ? 'text-cream-50' : 'text-ink-300 group-hover:text-ink-700'} />
                {label}
              </span>
              <span className="flex items-center gap-1.5">
                {id === 'notes' && noteCount > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-cream-50' : 'bg-cream-200 text-ink-500'}`}>
                    {noteCount}
                  </span>
                )}
                {isActive && <ChevronRight size={12} className="text-cream-50/60" />}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom tip */}
      <div className="m-3 p-3 rounded-lg bg-amber-light border border-amber-mid/20">
        <p className="text-xs text-ink-700 font-medium mb-0.5">💡 Pro Tip</p>
        <p className="text-xs text-ink-500 leading-relaxed">Paste your notes in Summarizer, then generate a quiz to test yourself!</p>
      </div>
    </aside>
  );
};

export default Sidebar;
