// Route user
import { Router } from 'express';
import {validate} from "../../middlewares/auth/validate.middlewares";
import {registerHooks} from "node:module";
import {registerSchema} from "../../schemas/auth.schema";
import test from "node:test";
import { register } from '../../controllers/auth.controller';
import prisma from '../../lib/prisma';

const router = Router();

router.get('/users', (req, res) => {
    res.json({ message: 'Users route OK' });
});

router.post('/register', (validate(registerSchema), register))


export default router;