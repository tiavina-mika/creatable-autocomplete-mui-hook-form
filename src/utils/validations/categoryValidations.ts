import { object, string } from "zod";

export const categorySchema = object({
  name: string(),
  tags: string().optional()
});
