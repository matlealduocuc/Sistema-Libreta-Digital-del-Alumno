import { z } from "zod";

/* Auth **/

export const authSchema = z.object({
  rut: z.string().regex(/^\d{1,3}(\.\d{3})*-[0-9kK]{1}$/, {
    message: "El formato del RUT debe ser 12.345.678-K"
  }),
  password: z.string().min(6),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "rut" | "password">;
