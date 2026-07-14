import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import HomePage from './HomePage';
import ExplainPage from './ExplainPage';
import SummarizePage from './SummarizePage';
import QuizPage from './QuizPage';
import NotesPage from './NotesPage';
import { useNotes } from '../hooks/useNotes';

const Dashboard = () => {
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
      <Sidebar activePage={activePage} onNavigate={setActivePage} noteCount={notes.length} />
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto w-0">
        <Header activePage={activePage} />
        <div className="flex-1">{renderPage()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
