import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username is required")
    .regex(/^[A-Za-z]+$/, "Username must contain only letters"),

    
  password: z
    .string()
    .min(1, "Password is required")
    .regex(/^[A-Za-z]+$/, "Password must contain only letters"),

  
});

export type LoginForm = z.infer<typeof loginSchema>;