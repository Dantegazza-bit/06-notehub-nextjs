// types/note.ts

export type NoteTag = "Work" | "Personal" | "Shopping" | "Todo" | "Meeting";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; // ← додали
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}
