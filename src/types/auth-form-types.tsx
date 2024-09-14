import { z } from "zod";
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export const SignUpSchema = z
  .object({
    name: z.string().min(3, "There will at least three names "),
    role: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.confirmPassword !== undefined) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type SignInSchemaType = z.infer<typeof SignInSchema>;
export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
