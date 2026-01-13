import { z } from "zod";

export const addWrapSchema = z.object({
  wrap_type: z.string().nonempty("Wrap type is required"),
  wrap_location: z.string().nonempty("Location is required"),
  wrap_status: z.string().nonempty("Status is required"),
});

export type AddWrapSchema = z.infer<typeof addWrapSchema>;
