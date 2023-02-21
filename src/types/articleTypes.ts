import { z } from "zod";
import { articleSchema } from "../utils/validations/articleValidations";

export type ArticleInput = z.infer<typeof articleSchema>;
