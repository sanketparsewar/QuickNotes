import { useEffect, useRef, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import useStore from "../store/useStore";
import type { note } from "../types/type";

type NoteCardProps = {
  note: note;
};

export function NoteCard({ note }: NoteCardProps) {
  const { removeNote, updateNote } = useStore();
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditNote = (setter: (field: string) => void, value: string) => {
    setIsEditing(true);
    setter(value);
  };
  const handleUpdateNote = () => {
    updateNote({ ...note, title, description });
    setIsEditing(false);
  };
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [description]);

  return (
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-100 hover:shadow-md transition flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => handleEditNote(setTitle, e.target.value)}
          maxLength={25}
          max={25}
          className="text-xl font-semibold bg-transparent border-none focus:outline-none placeholder:text-gray-400"
        />
        {isEditing ? (
          <button
            className="cursor-pointer text-green-600 hover:text-green-500 text-sm font-medium transition"
            onClick={handleUpdateNote}
          >
            <Check />
          </button>
        ) : (
          <button
            className="cursor-pointer text-red-500 hover:text-red-400 transition"
            onClick={() => removeNote(note.id)}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <textarea
        ref={textareaRef}
        value={description}
        placeholder="Take a note..."
        rows={1}
        onChange={(e) => handleEditNote(setDescription, e.target.value)}
        className="bg-transparent border-none focus:outline-none resize-none text-gray-700 placeholder:text-gray-400 leading-relaxed"
        style={{ overflow: "hidden" }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
      />
    </div>
  );
}
