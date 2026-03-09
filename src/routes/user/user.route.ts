// Route user
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Users route OK' });
});


export default router;
