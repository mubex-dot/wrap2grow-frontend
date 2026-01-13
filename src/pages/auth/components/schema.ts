import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(1, "Username is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(4, "Minimum of 4 characters is required"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .min(1, "Username is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .min(1, "Email is required")
      .email("Invalid email. Email must be a valid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Minimum of 6 characters is required"),
    farm_location: z.string().optional(),
    farm_coordinate: z.string().optional(),
    confirm_password: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
