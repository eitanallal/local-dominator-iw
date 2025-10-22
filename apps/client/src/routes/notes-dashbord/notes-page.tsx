import React, { useState, useEffect } from 'react';
import api from '../../providers/axiosApi';
import { Note } from './note';

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const fetchNotes = async () => {
    const res = await api.get('/notes');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/notes', {
      title,
      content,
      tags: tags.split(',').map((t) => t.trim()),
    });
    setTitle('');
    setContent('');
    setTags('');
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  const handleUpdate = async (id: string, updated: Partial<Note>) => {
    try {
      await api.put(`/notes/${id}`, updated);
      setNotes(
        notes.map((note) => (note.id === id ? { ...note, ...updated } : note))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">My Notes</h2>

      <form onSubmit={handleCreate} className="mb-6 border p-4 rounded">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Note
        </button>
      </form>

      <div>
        {notes.map((note: Note) => (
          <Note
            key={note.id}
            note={note}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};
