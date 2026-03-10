import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email('Email invalide'),
    first_name: z.string().min(2, 'Prénom min 2 caractères'),
    last_name: z.string().min(2, 'Nom min 2 caractères'),
    pseudo: z.string().min(3, 'Pseudo min 3 caractères').max(20),
    phone: z.string(),
    password: z
        .string()
        .min(8, 'Password min 8 caractères')
        .regex(/[A-Z]/, 'Au moins une majuscule')
        .regex(/[0-9]/, 'Au moins un chiffre'),
});

export type RegisterInput = z.infer<typeof registerSchema>;