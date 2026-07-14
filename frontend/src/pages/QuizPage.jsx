import React, { useState } from 'react';
import { Layers, Sparkles, RotateCcw, CheckCircle, XCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { aiAPI } from '../utils/api';
import LoadingDots from '../components/layout/LoadingDots';
import toast from 'react-hot-toast';

const QUESTION_OPTIONS = [5, 10, 15, 20, 25, 30];
const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 50;

const DIFFICULTIES = [
  { value: 'easy', label: 'Easy', color: 'bg-sage-light text-sage-accent border-sage-accent/30' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-light text-amber-accent border-amber-mid/30' },
  { value: 'hard', label: 'Hard', color: 'bg-rose-light text-rose-accent border-rose-accent/30' },
];

const QuizPage = () => {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [customCount, setCustomCount] = useState('');
  const [useCustomCount, setUseCustomCount] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [errors, setErrors] = useState({});

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const effectiveCount = useCustomCount ? Number(customCount) : numQuestions;

  const validate = () => {
    const next = {};
    if (!topic.trim()) next.topic = 'Please enter a topic to quiz yourself on';

    if (useCustomCount) {
      const n = Number(customCount);
      if (!customCount || !Number.isInteger(n) || n < MIN_QUESTIONS || n > MAX_QUESTIONS) {
        next.count = `Enter a number between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}`;
      }
    } else if (!numQuestions) {
      next.count = 'Please select the number of questions';
    }

    if (!difficulty) next.difficulty = 'Please select a difficulty level';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const generateQuiz = async () => {
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    try {
      const { data } = await aiAPI.quiz(topic.trim(), effectiveCount, difficulty);
      setQuiz(data);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to generate quiz. Please try again.');
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
  const total = quiz?.questions?.length || 0;
  const scoreRatio = total ? score / total : 0;

  const reset = () => {
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    setTopic('');
    setDifficulty(null);
    setUseCustomCount(false);
    setCustomCount('');
    setNumQuestions(10);
    setErrors({});
  };

  return (
    <div className="p-8 w-full animate-fade-in">
      {!quiz ? (
        <div className="space-y-5 max-w-xl">
          {/* Topic */}
          <div>
            <label className="section-label block mb-2">Quiz Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => { setTopic(e.target.value); if (errors.topic) setErrors((er) => ({ ...er, topic: undefined })); }}
              placeholder="e.g. Java, Operating Systems, Machine Learning…"
              className={`input-base ${errors.topic ? 'border-rose-accent focus:ring-rose-accent/10' : ''}`}
            />
            {errors.topic && (
              <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
                <AlertCircle size={12} /> {errors.topic}
              </p>
            )}
          </div>

          {/* Number of questions */}
          <div>
            <label className="section-label block mb-2">Number of Questions</label>
            <div className="flex flex-wrap gap-2">
              {QUESTION_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => { setUseCustomCount(false); setNumQuestions(n); if (errors.count) setErrors((er) => ({ ...er, count: undefined })); }}
                  className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                    !useCustomCount && numQuestions === n
                      ? 'bg-ink-900 border-ink-900 text-cream-50'
                      : 'bg-cream-50 border-ink-100 text-ink-700 hover:border-ink-300'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => { setUseCustomCount(true); if (errors.count) setErrors((er) => ({ ...er, count: undefined })); }}
                className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                  useCustomCount
                    ? 'bg-ink-900 border-ink-900 text-cream-50'
                    : 'bg-cream-50 border-ink-100 text-ink-700 hover:border-ink-300'
                }`}
              >
                Custom
              </button>
            </div>
            {useCustomCount && (
              <input
                type="number"
                min={MIN_QUESTIONS}
                max={MAX_QUESTIONS}
                value={customCount}
                onChange={(e) => { setCustomCount(e.target.value); if (errors.count) setErrors((er) => ({ ...er, count: undefined })); }}
                placeholder={`${MIN_QUESTIONS}–${MAX_QUESTIONS}`}
                className={`input-base mt-2.5 max-w-[140px] ${errors.count ? 'border-rose-accent focus:ring-rose-accent/10' : ''}`}
              />
            )}
            {errors.count && (
              <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
                <AlertCircle size={12} /> {errors.count}
              </p>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label className="section-label block mb-2">Difficulty Level</label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => { setDifficulty(value); if (errors.difficulty) setErrors((er) => ({ ...er, difficulty: undefined })); }}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-150 ${
                    difficulty === value ? color : 'bg-cream-50 border-ink-100 text-ink-700 hover:border-ink-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.difficulty && (
              <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
                <AlertCircle size={12} /> {errors.difficulty}
              </p>
            )}
          </div>

          <button onClick={generateQuiz} disabled={loading} className="btn-primary w-full py-3">
            {loading ? (
              <LoadingDots size="sm" label="Generating questions..." />
            ) : (
              <>
                <Sparkles size={15} />
                Generate Quiz
              </>
            )}
          </button>

          <div className="p-4 rounded-xl bg-rose-light border border-rose-accent/10">
            <p className="text-xs text-ink-600 leading-relaxed">
              <strong className="text-ink-800">🎯 How it works:</strong> Pick a topic, how many questions you want,
              and a difficulty — the AI builds a multiple-choice quiz to match, with explanations for every answer.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-slide-up">
          {/* Score banner (after submit) */}
          {submitted && (
            <div className={`p-4 rounded-xl flex items-center justify-between ${
              scoreRatio >= 0.8 ? 'bg-sage-light border border-sage-accent/20' :
              scoreRatio >= 0.4 ? 'bg-amber-light border border-amber-mid/20' :
              'bg-rose-light border border-rose-accent/20'
            }`}>
              <div>
                <p className="font-display text-2xl font-semibold text-ink-900">{score}/{total}</p>
                <p className="text-xs text-ink-500 mt-0.5">
                  {scoreRatio === 1 ? '🎉 Perfect score! You nailed it!' :
                   scoreRatio >= 0.6 ? '👏 Good job! Keep studying the rest.' :
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