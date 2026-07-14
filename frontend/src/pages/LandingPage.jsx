import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, MessageSquare, FileText, Layers, BookOpen,
  ArrowRight, Menu, X, Github, Twitter, Linkedin,
  Zap, ShieldCheck, Infinity as InfinityIcon,
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    color: 'text-sky-accent',
    bg: 'bg-sky-light',
    title: 'Explain',
    desc: 'Ask about anything and get an ELI5-style breakdown — no jargon, no fluff, just the concept made clear.',
  },
  {
    icon: FileText,
    color: 'text-sage-accent',
    bg: 'bg-sage-light',
    title: 'Summarizer',
    desc: 'Paste in dense notes or a whole chapter, and get back a clean, structured set of bullet points.',
  },
  {
    icon: Layers,
    color: 'text-rose-accent',
    bg: 'bg-rose-light',
    title: 'Quiz Generator',
    desc: 'Turn any notes into 5 scored multiple-choice questions, complete with explanations for each answer.',
  },
  {
    icon: BookOpen,
    color: 'text-amber-accent',
    bg: 'bg-amber-light',
    title: 'Saved Notes',
    desc: 'Every summary is saved automatically into your own searchable library, ready whenever you need it.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Drop in your notes',
    desc: 'Paste a topic, a question, or a full page of notes — however messy.',
  },
  {
    n: '02',
    title: 'Get it explained or summarized',
    desc: 'Study Buddy breaks it down in plain language or compresses it into clear points.',
  },
  {
    n: '03',
    title: 'Test what stuck',
    desc: 'Generate a quiz from the same material and see what you actually remember.',
  },
];

const NavLink = ({ href, children }) => (
  <a href={href} className="text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors duration-150">
    {children}
  </a>
);

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-cream-50/90 backdrop-blur-sm shadow-sidebar' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center">
              <GraduationCap size={16} className="text-cream-50" />
            </div>
            <span className="font-display text-lg font-semibold text-ink-900">Study Buddy</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="btn-ghost">Log in</Link>
            <Link to="/register" className="btn-primary">Get started</Link>
          </div>

          <button
            className="md:hidden p-2 text-ink-700"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4 bg-cream-50 border-t border-ink-100/50 animate-fade-in">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" className="btn-secondary justify-center">Log in</Link>
              <Link to="/register" className="btn-primary justify-center">Get started</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-14 items-center">
        <div className="animate-slide-up">
          <span className="tag mb-5">Powered by fast, free AI inference</span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink-900 leading-[1.1] mt-4">
            Understand anything.
            <br />
            Remember it.
          </h1>
          <p className="mt-5 text-base text-ink-500 leading-relaxed max-w-md">
            Paste your notes, ask a question, or drop in a topic — Study Buddy explains it simply,
            summarizes it clearly, and quizzes you until it actually sticks.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/register" className="btn-primary text-sm px-5 py-3">
              Get started free <ArrowRight size={16} />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-sm px-5 py-3">
              See how it works
            </a>
          </div>
          <p className="mt-4 text-xs text-ink-300">No credit card. Takes about 30 seconds.</p>
        </div>

        {/* Signature: a live mock of the actual Explain feature, not a generic illustration */}
        <div className="relative animate-fade-in">
          <div className="card p-5 max-w-sm ml-auto">
            <div className="flex items-center gap-2 pb-3 border-b border-ink-100/60">
              <div className="w-6 h-6 rounded-md bg-sky-light flex items-center justify-center text-sky-accent">
                <MessageSquare size={13} />
              </div>
              <span className="text-xs font-medium text-ink-500">Explain</span>
            </div>
            <div className="pt-4 space-y-3">
              <div className="flex justify-end">
                <div className="bg-ink-900 text-cream-50 rounded-lg rounded-tr-sm px-3.5 py-2 text-sm max-w-[85%]">
                  what's photosynthesis?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-cream-100 text-ink-700 rounded-lg rounded-tl-sm px-3.5 py-2 text-sm max-w-[85%] leading-relaxed">
                  Plants turn sunlight into food. They take in light, water, and CO₂, and produce
                  sugar and oxygen as a byproduct.
                </div>
              </div>
              <div className="flex items-center gap-2 pl-1">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-pulse-dot"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-ink-300">generating quiz from this...</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 card px-3.5 py-2.5 flex items-center gap-2 bg-white">
            <Zap size={13} className="text-amber-accent" />
            <span className="text-xs font-medium text-ink-700">Answered in ~2s</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-lg mb-12">
          <p className="section-label mb-3">What it does</p>
          <h2 className="font-display text-3xl font-semibold text-ink-900">
            Four tools, one workflow
          </h2>
          <p className="mt-3 text-ink-500 leading-relaxed">
            Everything you need to go from confused to confident on any topic, without switching apps.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, color, bg, title, desc }) => (
            <div
              key={title}
              className="card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-lg ${bg} ${color} flex items-center justify-center mb-4`}>
                <Icon size={18} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink-900 mb-1.5">{title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section id="about" className="bg-cream-100/60 border-y border-ink-100/50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">Why Study Buddy</p>
            <h2 className="font-display text-3xl font-semibold text-ink-900 mb-5">
              Built for actually studying, not just chatting
            </h2>
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-sage-light text-sage-accent flex items-center justify-center">
                  <ShieldCheck size={15} />
                </div>
                <div>
                  <p className="font-medium text-ink-900 text-sm">Explains, doesn't just define</p>
                  <p className="text-sm text-ink-500 mt-0.5">Every answer is written to actually teach the concept, ELI5-style.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-sky-light text-sky-accent flex items-center justify-center">
                  <Zap size={15} />
                </div>
                <div>
                  <p className="font-medium text-ink-900 text-sm">Fast by default</p>
                  <p className="text-sm text-ink-500 mt-0.5">Runs on Groq's inference engine, so answers land in seconds, not minutes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-light text-amber-accent flex items-center justify-center">
                  <InfinityIcon size={15} />
                </div>
                <div>
                  <p className="font-medium text-ink-900 text-sm">Everything saved, automatically</p>
                  <p className="text-sm text-ink-500 mt-0.5">Summaries land in your notes library the moment you generate them.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-8 bg-white">
            <p className="font-display text-2xl font-semibold text-ink-900"> 5+ Questions </p>
            <p className="text-sm text-ink-500 mt-1 mb-6">scored MCQs generated per quiz, with explanations for every answer</p>
            <div className="h-px bg-ink-100/70 mb-6" />
            <p className="font-display text-2xl font-semibold text-ink-900">1 Platform</p>
            <p className="text-sm text-ink-500 mt-1">place to explain, summarize, quiz, and store your notes</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-lg mb-12">
          <p className="section-label mb-3">Process</p>
          <h2 className="font-display text-3xl font-semibold text-ink-900">How it works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ n, title, desc }, i) => (
            <div key={n} className="relative">
              <span className="font-display text-4xl font-semibold text-ink-100">{n}</span>
              <h3 className="font-display text-lg font-semibold text-ink-900 mt-3 mb-1.5">{title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-[calc(100%_-_0.5rem)] w-8 h-px bg-ink-100" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <div className="card bg-ink-900 px-8 py-14 text-center">
          <h2 className="font-display text-3xl font-semibold text-cream-50">
            Ready to study smarter?
          </h2>
          <p className="mt-3 text-cream-50/60 max-w-md mx-auto">
            Create a free account and turn your first set of notes into a quiz in under a minute.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className="btn-primary bg-cream-50 text-ink-900 hover:bg-cream-100 text-sm px-5 py-3">
              Get started free <ArrowRight size={16} />
            </Link>
            <a href="mailto:hello@studybuddy.app" className="btn-ghost text-cream-50/80 hover:text-cream-50 hover:bg-white/5 text-sm px-5 py-3">
              Or email us directly
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-100/60">
        <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-ink-900 flex items-center justify-center">
                <GraduationCap size={14} className="text-cream-50" />
              </div>
              <span className="font-display text-base font-semibold text-ink-900">Study Buddy</span>
            </div>
            <p className="text-xs text-ink-300 leading-relaxed max-w-[180px]">
              An AI learning assistant that explains, summarizes, and quizzes you on anything.
            </p>
          </div>
          <div>
            <p className="section-label mb-3">Product</p>
            <ul className="space-y-2 text-sm text-ink-500">
              <li><a href="#features" className="hover:text-ink-900">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-ink-900">How it works</a></li>
              <li><Link to="/register" className="hover:text-ink-900">Get started</Link></li>
            </ul>
          </div>
          <div>
            <p className="section-label mb-3">Company</p>
            <ul className="space-y-2 text-sm text-ink-500">
              <li><a href="#about" className="hover:text-ink-900">About</a></li>
              <li><a href="#contact" className="hover:text-ink-900">Contact</a></li>
              <li><a href="/privacy" className="hover:text-ink-900">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-ink-900">Terms</a></li>
            </ul>
          </div>
          <div>
            <p className="section-label mb-3">Follow</p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Github" className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-ink-500 hover:text-ink-900 hover:bg-cream-200">
                <Github size={15} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-ink-500 hover:text-ink-900 hover:bg-cream-200">
                <Linkedin size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-ink-100/60 px-6 py-5 text-center">
          <p className="text-xs text-ink-300">© {new Date().getFullYear()} Study Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
