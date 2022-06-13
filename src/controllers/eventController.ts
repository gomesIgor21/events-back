import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ROLE, roleMiddleware } from '../middlewares/roleMiddleware';
import { eventCreate, eventsFindByDate } from '../services/eventService';

const eventRouter = Router();

eventRouter.post(
	'/events',
	authMiddleware,
	roleMiddleware([ROLE.ORGANIZER]),
	async (req, res) => {
		try {
			const event = await eventCreate(req.body);
			res.status(200).json(event);
		} catch (e) {
			res.status(500).json({ error: e.message });
		}
	}
);

eventRouter.get('/events/date/:date', authMiddleware, async (req, res) => {
	try {
		const events = await eventsFindByDate(req.params.date);
		res.status(200).json({ events });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

// eventRouter.get(
// 	'/events/invitation',
// 	authMiddleware,
// 	roleMiddleware([ROLE.GUEST]),
// 	async (req, res) => {
// 		try {
// 			const invite = await invitationCreate(req.body);
// 			res.status(200).json({ sucesso: 'Ingresso comprado com sucesso' });
// 		} catch (e) {
// 			res.status(500).json({ error: e.message });
// 		}
// 	}
// );

export { eventRouter };
