import { useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';

type Props = {
  note: Note;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (id: string, updated: Partial<Note>) => Promise<void>;
};

export const Note: React.FC<Props> = ({ note, handleDelete, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const saveEdit = async () => {
    await handleUpdate(note.id, { title, content });
    setIsEditing(false);
  };

  return (
    <div key={note.id} className="border p-4 mb-2 rounded">
      {isEditing ? (
        <>
          <input
            className="border p-1 mb-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-1 mb-1 w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="bg-green-500 text-white p-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold">{note.title}</h3>
          <p>{note.content}</p>
          {note.tags && (
            <p className="text-sm text-gray-500">
              Tags: {note.tags.join(', ')}
            </p>
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white p-1 rounded"
            >
              <FaPen size={18} />
            </button>
            <button
              onClick={() => handleDelete(note.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
