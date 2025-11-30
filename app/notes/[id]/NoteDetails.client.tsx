// app/notes/[id]/NoteDetails.client.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

import css from "../../NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();

  const idParam = params?.id;
  const id =
    typeof idParam === "string"
      ? idParam
      : Array.isArray(idParam)
      ? idParam[0]
      : "";

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  const createdDate = new Date(note.createdAt).toLocaleString();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{createdDate}</p>
      </div>
    </div>
  );
}
