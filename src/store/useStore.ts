import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { note } from "../types/type";

interface Store {
  notes: note[];
  addNote: (note: note) => void;
  removeNote: (id: number) => void;
  updateNote: (note: note) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note: note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),
      removeNote: (id:number) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
      updateNote: (note: note) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === note.id ? note : n)),
        })),
    }),
    {
      name: "notes-storage",
    },
  ),
);

export default useStore;
