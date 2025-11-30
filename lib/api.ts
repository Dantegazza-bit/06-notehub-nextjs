// lib/api.ts
import axios from "axios";
import type { Note } from "@/types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN?.trim();

if (!token) {
  // видно тільки в консолі розробника
  // на проді бекенд просто поверне 401
  console.warn("NEXT_PUBLIC_NOTEHUB_TOKEN is not set");
}

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

// ---- Типи, повʼязані з HTTP-відповідями/параметрами ----

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note["tag"];
}

// ---- HTTP-функції ----

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { page, perPage, search = "" } = params;

  const res = await client.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });

  return res.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const res = await client.post<Note>("/notes", payload);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await client.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await client.get<Note>(`/notes/${id}`);
  return res.data;
}
