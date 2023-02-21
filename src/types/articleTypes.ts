import { z } from "zod";
import { articleSchema } from "../utils/validations/articleValidations";

export interface ICategory {
  name: string;
  objectId: string;
  active: boolean;
}

export type ArticleInput = z.infer<typeof articleSchema>;
