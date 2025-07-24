// התנאים של דף ההרשמה
import { z } from "zod";

export const userSchema = z
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
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(500, "Message must be less than 500 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type UserSchema = z.infer<typeof userSchema>;
