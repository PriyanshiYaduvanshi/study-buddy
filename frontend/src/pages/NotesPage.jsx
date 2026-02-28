import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Trash2, ChevronDown, ChevronUp, Search, Tag, Plus, X } from 'lucide-react';
import LoadingDots from '../components/layout/LoadingDots';

const NOTE_COLORS = ['#fdfcf8', '#eff6ff', '#f0f7f2', '#fdf2f5', '#fef3c7'];

const NoteCard = ({ note, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="card overflow-hidden hover:shadow-card-hover transition-all duration-200"
      style={{ borderLeft: `3px solid ${note.color !== '#fdfcf8' ? note.color : 'transparent'}` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-medium text-ink-900 text-sm leading-tight">{note.title}</h3>
            <p className="text-xs text-ink-300 mt-0.5">
              {new Date(note.updatedAt || note.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setExpanded((p) => !p)}
              className="btn-ghost p-1.5 text-xs"
            >
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="btn-ghost p-1.5 text-rose-accent hover:bg-rose-light"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {note.tags.map((t) => (
              <span key={t} className="tag">
                <Tag size={8} className="mr-0.5" />{t}
              </span>
            ))}
          </div>
        )}

        {/* Preview */}
        {!expanded && (
          <p className="text-xs text-ink-400 leading-relaxed line-clamp-2">
            {note.summary
              ? note.summary.replace(/[*#]/g, '').slice(0, 120) + '...'
              : note.content.slice(0, 120) + '...'}
          </p>
        )}
      </div>

      {expanded && (
        <div className="border-t border-ink-100/50 px-4 py-3 bg-cream-50/50 space-y-3 animate-slide-up">
          {note.summary && (
            <div>
              <p className="section-label mb-1.5">Summary</p>
              <div className="ai-prose text-xs text-ink-600 leading-relaxed">
                <ReactMarkdown>{note.summary}</ReactMarkdown>
              </div>
            </div>
          )}
          <div>
            <p className="section-label mb-1.5">Original Notes</p>
            <p className="text-xs text-ink-500 leading-relaxed whitespace-pre-wrap font-mono bg-cream-100 p-3 rounded-lg max-h-48 overflow-y-auto">
              {note.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const NotesPage = ({ notes, loading, onDelete, onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <LoadingDots label="Loading notes..." />
      </div>
    );
  }

  return (
    <div className="p-8 w-full animate-fade-in">
      {notes.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={22} className="text-ink-300" />
          </div>
          <h3 className="font-display text-lg text-ink-900 mb-2">No saved notes yet</h3>
          <p className="text-sm text-ink-400 mb-5">
            Use the Summarizer to create your first note
          </p>
          <button onClick={() => onNavigate('summarize')} className="btn-primary">
            <Plus size={14} />
            Create a Note
          </button>
        </div>
      ) : (
        <>
          <div className="relative mb-5">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="input-base pl-9"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-700"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-ink-400 py-8">No notes match your search.</p>
            ) : (
              filtered.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={onDelete} />
              ))
            )}
          </div>
          <p className="text-xs text-ink-300 text-center mt-4">{filtered.length} note{filtered.length !== 1 ? 's' : ''}</p>
        </>
      )}
    </div>
  );
};

export default NotesPage;
