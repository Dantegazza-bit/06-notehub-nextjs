// components/NoteForm/NoteForm.tsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { CreateNotePayload, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";

import css from "./NoteForm.module.css";

export interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"), // ✅ без .required
  tag: Yup.mixed<NoteTag>()
    .oneOf(
      ["Todo", "Work", "Personal", "Shopping", "Meeting"],
      "Tag is invalid"
    )
    .required("Tag is required"),
});

const initialValues: CreateNotePayload = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created");
      onClose();
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  return (
    <Formik<CreateNotePayload>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, helpers) => {
        createMutation.mutate(values);
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            <span>Title</span>
            <Field name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </label>

          <label className={css.label}>
            <span>Content</span>
            <Field
              as="textarea"
              name="content"
              className={`${css.input} ${css.textarea}`}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </label>

          <label className={css.label}>
            <span>Tag</span>
            <Field as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </label>

          <div className={css.buttons}>
            <button
              type="button"
              className={css.buttonSecondary}
              onClick={onClose}
              disabled={createMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.buttonPrimary}
              disabled={isSubmitting || createMutation.isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
