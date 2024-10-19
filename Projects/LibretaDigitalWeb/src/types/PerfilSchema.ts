import { z } from "zod";

export const updatePerfilSchema = z.object({
  email: z
    .string()
    .email({ message: "Correo electrónico inválido" })
    .optional()
    .nullable()
    .refine(
      (value) =>
        value === null ||
        value === "" ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? ""),
      {
        message: "Correo electrónico inválido",
      }
    ),
  phone: z
    .string()
    .optional()
    .nullable()
    .refine(
      (value) =>
        value === null ||
        value === "" ||
        /^\+?(\d{1,3})?\s?\d{1,14}$/.test(value ?? ""),
      {
        message: "El formato del teléfono es inválido",
      }
    ),
  address: z.string().optional().nullable(),
});

export type UpdatePerfil = z.infer<typeof updatePerfilSchema>;
