import { useState, useEffect, useCallback } from 'react';
import { notesAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await notesAPI.getAll();
      setNotes(data);
    } catch {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const createNote = async (noteData) => {
    try {
      const { data } = await notesAPI.create(noteData);
      setNotes((prev) => [data, ...prev]);
      toast.success('Note saved!');
      return data;
    } catch {
      toast.error('Failed to save note');
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const { data } = await notesAPI.update(id, noteData);
      setNotes((prev) => prev.map((n) => (n._id === id ? data : n)));
      toast.success('Note updated!');
      return data;
    } catch {
      toast.error('Failed to update note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesAPI.delete(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success('Note deleted');
    } catch {
      toast.error('Failed to delete note');
    }
  };

  return { notes, loading, fetchNotes, createNote, updateNote, deleteNote };
};
