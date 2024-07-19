import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, { message: "Must be at least 3 characters long"}),
    email: z.string().email({ message: "Must be a valid email"}),
    password: z.string().min(5, { message: "Must be at least 5 characters long"}),
    confirmPassword: z.string().min(5, { message: "Must be at least 5 characters long"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})