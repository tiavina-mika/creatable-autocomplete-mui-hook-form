import { object, string } from "zod";

const selectOptionSchema = object({
  label: string().nullable(),
  value: string().nullable(),
});

export const articleSchema = object({
  category: selectOptionSchema,
});