import { Router } from 'express';
import { userRouter } from './controllers/userController';

const router = Router();

router.get('/check', async (req, res) => {
  try {
    const msg = 'API OK'
    res.status(200).json(msg)
  } catch (err) {
    const e = err as Error
    res.status(500).json({error: e.message, msg: "API Error"});
  }
});

router.use('/u', userRouter);

export { router };
