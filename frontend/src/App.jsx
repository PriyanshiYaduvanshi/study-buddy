import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ExplainPage from './pages/ExplainPage';
import SummarizePage from './pages/SummarizePage';
import QuizPage from './pages/QuizPage';
import NotesPage from './pages/NotesPage';
import { useNotes } from './hooks/useNotes';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const { notes, loading, createNote, deleteNote } = useNotes();

  const handleSaveNote = async (noteData) => {
    await createNote(noteData);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':      return <HomePage onNavigate={setActivePage} noteCount={notes.length} />;
      case 'explain':   return <ExplainPage />;
      case 'summarize': return <SummarizePage onSaveNote={handleSaveNote} />;
      case 'quiz':      return <QuizPage />;
      case 'notes':     return <NotesPage notes={notes} loading={loading} onDelete={deleteNote} onNavigate={setActivePage} />;
      default:          return <HomePage onNavigate={setActivePage} noteCount={notes.length} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-cream-50">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1714',
            color: '#fdfcf8',
            fontSize: '13px',
            borderRadius: '10px',
            padding: '10px 14px',
          },
          success: { iconTheme: { primary: '#4a7c59', secondary: '#fdfcf8' } },
          error: { iconTheme: { primary: '#be4b6f', secondary: '#fdfcf8' } },
        }}
      />
      <Sidebar activePage={activePage} onNavigate={setActivePage} noteCount={notes.length} />
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto w-0">
        <Header activePage={activePage} />
        <div className="flex-1">{renderPage()}</div>
      </main>
    </div>
  );
};

export default App;
