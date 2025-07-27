import { z } from "zod";

// Login Schema - name, email and password
export const loginSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Must include letters")
    .regex(/\d/, "Must include numbers"),
});

// Signup Schema - everything except message
export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must contain at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Must include letters")
      .regex(/\d/, "Must include numbers"),
    confirmPassword: z.string(),
    age: z
      .string()
      .regex(/^\d+$/, "Must be a number")
      .refine((val) => +val >= 18, "You must be at least 18")
      .refine((val) => +val <= 120, "Maximum age is 120"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
