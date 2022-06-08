import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { userDelete, userFindById, userRegister, userUpdate } from "../services/userServices";

const userRouter = Router();

userRouter.post(
	'/register',
	async (req, res) => {
		try {
			await userRegister(req.body);
			res.status(201).json({ sucesso: 'Usuário cadastrado com Sucesso' });
		} catch (err) {
      const e = err as Error			
			res.status(400).json({ error: e.message });
		}
	}
);

userRouter.get(
	'/:id',
	authMiddleware,
	async (req, res) => {
		try {
			const user = await userFindById(req.params.id);
			res.status(200).json({ user: user });
		} catch (err) {
      const e = err as Error
			res.status(400).json({ error: e.message });
		}
	}
);

userRouter.put(
	'/update',
	authMiddleware, 
	async (req, res) => {
		try {
			await userUpdate(req.body);
			res.status(200).json({ sucesso: 'Usuário atualizado com sucesso!' });
		} catch (err) {
      const e = err as Error		
			res.status(400).json({ error: e.message });
		}
	}
);

userRouter.delete(
	'/delete/:id',
	authMiddleware,
	async (req, res) => {
		try {
			await userDelete(req.params.id);
			res.status(200).json({ sucesso: 'Usuário deletado com sucesso!' });
		} catch (err) {
      const e = err as Error			
			res.status(400).json({ error: e.message });
		}
	}
);

export {userRouter}