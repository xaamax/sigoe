import {
  requiredCheckGroup,
  requiredString,
  requiredTrueValue,
} from "@/helpers/form-schemas-validators";
import { z } from "zod";

export const normalFormSchema = z.object({
  textInput: requiredString("Campo obrigatório"),
  textInputWithDesc: requiredString("Campo obrigatório"),
  selectInput: requiredString("Campo obrigatório"),
  radioInput: requiredString("Campo obrigatório"),
  checkgroupInput: requiredCheckGroup("Campo obrigatório"),
  checkboxInput: requiredTrueValue("Need to be checked"),
  passwordInput: requiredString("Campo obrigatório"),
  dateInput: requiredString("Campo obrigatório"),
  textareaInput: requiredString("Campo obrigatório"),
});
