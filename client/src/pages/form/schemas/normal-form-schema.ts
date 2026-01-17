import {
  requiredCheckGroup,
  requiredString,
  requiredTrueValue,
} from "@/helpers/form-schemas-validators";
import { z } from "zod";

export const normalFormSchema = z.object({
  textInput: requiredString("This field é obrigatório!"),
  textInputWithDesc: requiredString("This field é obrigatório!"),
  selectInput: requiredString("This field é obrigatório!"),
  radioInput: requiredString("This field é obrigatório!"),
  checkgroupInput: requiredCheckGroup("This field é obrigatório!"),
  checkboxInput: requiredTrueValue("Need to be checked"),
  passwordInput: requiredString("This field é obrigatório!"),
  dateInput: requiredString("This field é obrigatório!"),
  textareaInput: requiredString("This field é obrigatório!"),
});
