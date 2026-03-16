import { Plus } from "lucide-react";
import "./App.css";
import { NoteCard } from "./components/NoteCard";
import useStore from "./store/useStore";

function App() {
  const { notes, addNote } = useStore();
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: ``,
      description: "",
    };
    addNote(newNote);
  };
  return (
    <div className="container mx-auto p-4" >
      <h1 className="text-2xl font-bold mb-4">My QuickNotes ({notes.length})</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {notes && notes.map((note) => <NoteCard key={note.id} note={note} />)}
        <div
          onClick={handleAddNote}
          className="flex items-center justify-center border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-100 hover:shadow-md transition  "
        >
          <Plus className="text-gray-500 hover:text-gray-400 cursor-pointer " />
        </div>
      </div>
    </div>
  );
}

export default App;
