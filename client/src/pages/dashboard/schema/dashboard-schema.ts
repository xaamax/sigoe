import { z } from "zod";

export const dashboardSchema = z.object({
  ano_letivo: z.number(),
  dre: z.string().optional(),
  ue: z.string().optional(),
});
export type DashboardFormValues = z.infer<typeof dashboardSchema>;

export const dashboardListSchema = z.array(dashboardSchema);
