import { z } from "zod";

/* Auth **/

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
