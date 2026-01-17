import { requiredString } from "@/helpers/form-schemas-validators";
import { z } from "zod";

export const loginSchema = z.object({
  username: requiredString("Campo obrigatório."),
  password: requiredString("Campo obrigatório."),
});
