// app/notes/Notes.client.tsx
"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";

import css from "./NotesPage.module.css";

interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
}

export default function NotesClient({
  initialPage,
  initialSearch,
}: NotesClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);
  const perPage = 12;

  const { data, isLoading, isError, error, isFetching } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ["notes", { page, search: debouncedSearch }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  if (!isLoading && !isError && notes.length === 0 && search.trim() !== "") {
    toast.error("No notes found");
  }

  return (
    <div className={css.main}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p className={css.status}>Loading...</p>}

      {isError && (
        <p className={css.status}>{error?.message ?? "Failed to load notes"}</p>
      )}

      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

      {isFetching && !isLoading && (
        <p className={css.statusSmall}>Updating...</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <Toaster position="top-right" />
    </div>
  );
}
