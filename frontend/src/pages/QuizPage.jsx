import React, { useState } from 'react';
import { Layers, Sparkles, RotateCcw, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { aiAPI } from '../utils/api';
import LoadingDots from '../components/layout/LoadingDots';
import toast from 'react-hot-toast';

const QuizPage = () => {
  const [text, setText] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const generateQuiz = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    try {
      const { data } = await aiAPI.quiz(text);
      setQuiz(data);
    } catch {
      toast.error('Failed to generate quiz. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (qId, option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const submitQuiz = () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      toast.error('Please answer all questions first!');
      return;
    }
    setSubmitted(true);
  };

  const score = submitted
    ? quiz.questions.filter((q) => answers[q.id] === q.correctAnswer).length
    : 0;

  const reset = () => { setQuiz(null); setAnswers({}); setSubmitted(false); setText(''); };

  return (
    <div className="p-8 w-full animate-fade-in">
      {!quiz ? (
        <div className="space-y-4">
          <div>
            <label className="section-label block mb-2">Study Material</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your study notes, chapter summary, or any topic text here…"
              className="textarea-base"
              rows={10}
            />
          </div>
          <button onClick={generateQuiz} disabled={!text.trim() || loading} className="btn-primary w-full py-3">
            {loading ? (
              <LoadingDots size="sm" label="Generating questions..." />
            ) : (
              <>
                <Sparkles size={15} />
                Generate 5 Quiz Questions
              </>
            )}
          </button>

          <div className="p-4 rounded-xl bg-rose-light border border-rose-accent/10">
            <p className="text-xs text-ink-600 leading-relaxed">
              <strong className="text-ink-800">🎯 How it works:</strong> The AI reads your notes and creates 5 
              multiple-choice questions that test your understanding of the core concepts.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-slide-up">
          {/* Score banner (after submit) */}
          {submitted && (
            <div className={`p-4 rounded-xl flex items-center justify-between ${
              score >= 4 ? 'bg-sage-light border border-sage-accent/20' :
              score >= 2 ? 'bg-amber-light border border-amber-mid/20' :
              'bg-rose-light border border-rose-accent/20'
            }`}>
              <div>
                <p className="font-display text-2xl font-semibold text-ink-900">{score}/5</p>
                <p className="text-xs text-ink-500 mt-0.5">
                  {score === 5 ? '🎉 Perfect score! You nailed it!' :
                   score >= 3 ? '👏 Good job! Keep studying the rest.' :
                   '📚 Keep practicing — review the explanations below.'}
                </p>
              </div>
              <button onClick={reset} className="btn-secondary">
                <RotateCcw size={14} />
                New Quiz
              </button>
            </div>
          )}

          {/* Questions */}
          {quiz.questions.map((q, i) => {
            const selected = answers[q.id];
            const isCorrect = selected === q.correctAnswer;
            return (
              <div key={q.id} className="card p-5">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-6 h-6 rounded-full bg-ink-900 text-cream-50 text-xs flex items-center justify-center shrink-0 font-medium mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium text-ink-900 leading-relaxed">{q.question}</p>
                </div>

                <div className="space-y-2 ml-9">
                  {q.options.map((option) => {
                    let style = 'bg-cream-50 border-ink-100 text-ink-700 hover:border-ink-300 hover:bg-cream-100';
                    if (selected === option && !submitted) style = 'bg-ink-900 border-ink-900 text-cream-50';
                    if (submitted) {
                      if (option === q.correctAnswer) style = 'bg-sage-light border-sage-accent/40 text-sage-accent';
                      else if (selected === option && !isCorrect) style = 'bg-rose-light border-rose-accent/40 text-rose-accent';
                      else style = 'bg-cream-50 border-ink-100 text-ink-400';
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => selectAnswer(q.id, option)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-150 flex items-center justify-between ${style} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        {option}
                        {submitted && option === q.correctAnswer && <CheckCircle size={14} className="shrink-0" />}
                        {submitted && selected === option && !isCorrect && <XCircle size={14} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && q.explanation && (
                  <div className="ml-9 mt-3 p-3 rounded-lg bg-cream-100 text-xs text-ink-600 leading-relaxed">
                    <strong className="text-ink-800">Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <button
              onClick={submitQuiz}
              disabled={Object.keys(answers).length < quiz.questions.length}
              className="btn-primary w-full py-3"
            >
              Submit Answers
              <ChevronRight size={15} />
            </button>
          )}
          {submitted && (
            <button onClick={reset} className="btn-secondary w-full">
              <RotateCcw size={14} />
              Try a New Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
