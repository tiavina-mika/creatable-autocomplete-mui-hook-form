import { z } from "zod";
import { categorySchema } from "../utils/validations/categoryValidations";

export interface ICategory {
  name: string;
  objectId: string;
  active: boolean;
}

export type CategoryInput = z.infer<typeof categorySchema>;
