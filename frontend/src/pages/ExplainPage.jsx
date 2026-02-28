import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Trash2, Lightbulb } from 'lucide-react';
import { aiAPI } from '../utils/api';
import LoadingDots from '../components/layout/LoadingDots';
import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'study-buddy-session';

// eslint-disable-next-line no-unused-vars
const getSession = () => {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) { id = uuidv4(); localStorage.setItem(SESSION_KEY, id); }
  return id;
};

const suggestions = [
  'Explain quantum entanglement',
  'What is the Pythagorean theorem?',
  'How does photosynthesis work?',
  'What is machine learning?',
  'Explain DNA replication',
];

const ExplainPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    const query = text || input.trim();
    if (!query || loading) return;

    const userMsg = { role: 'user', content: query, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await aiAPI.explain(query);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.explanation, id: Date.now() + 1 }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Failed to get explanation. Please check your API key and try again.', id: Date.now() + 1 }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const clear = () => setMessages([]);

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={15} className="text-amber-accent" />
              <p className="text-sm text-ink-400 font-medium">Try asking about...</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 rounded-full bg-white border border-ink-100 text-xs text-ink-600 hover:border-ink-300 hover:text-ink-900 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex animate-slide-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-ink-900 flex items-center justify-center text-[11px] text-cream-50 mr-2.5 mt-0.5 shrink-0 font-display">
                AI
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-ink-900 text-cream-50 rounded-br-sm'
                  : 'bg-white border border-ink-100/70 shadow-card text-ink-800 rounded-bl-sm'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="ai-prose">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-ink-900 flex items-center justify-center text-[11px] text-cream-50 mr-2.5 shrink-0 font-display">
              AI
            </div>
            <div className="bg-white border border-ink-100/70 shadow-card rounded-2xl rounded-bl-sm px-4 py-3">
              <LoadingDots label="Thinking..." />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-8 py-4 border-t border-ink-100/50 bg-cream-50/80 backdrop-blur-sm">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me to explain any concept... (Enter to send)"
              rows={1}
              className="textarea-base pr-12"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <div className="flex gap-1.5">
            {messages.length > 0 && (
              <button onClick={clear} className="btn-ghost p-2.5" title="Clear chat">
                <Trash2 size={15} />
              </button>
            )}
            <button onClick={() => send()} disabled={!input.trim() || loading} className="btn-primary px-3 py-2.5">
              <Send size={15} />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-ink-300 mt-1.5">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
};

export default ExplainPage;
