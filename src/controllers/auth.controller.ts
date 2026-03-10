import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';
import { RegisterInput } from '../schemas/auth.schema';

export const register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response
): Promise<void> => {
    const { email, first_name, last_name, pseudo, phone,  password } = req.body;

    try {
        // Vérifier si l'email ou le username existe déjà
        const existing = await prisma.user.findFirst({
            where: { OR: [{ email }, { pseudo }] },
        });

        if (existing) {
            const field = existing.email === email ? 'email' : 'username';
            res.status(409).json({ error: `Ce ${field} est déjà utilisé` });
            return;
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: { email, first_name, last_name, pseudo, phone,  password: hashedPassword },
            select: { id: true, email: true, first_name: true, last_name: true, pseudo: true, phone: true, createdAt: true },
        });

        res.status(201).json({ message: 'Compte créé avec succès', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};