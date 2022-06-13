import { EventType } from '../types/EventType';
import { prisma } from '../utils/prismaClient';

const saveEvent = async (payload: EventType) => {
	try {
		const saved = await prisma.events.create({
			data: {
				title: payload.title,
				date: new Date(payload.date),
				hour: new Date(payload.hour),
				description: payload.description,
				organizer_id: payload.organizer_id,
			},
		});
		return saved;
	} catch (e) {
		throw new Error(e.message);
	}
};

const findEventsByDate = async (date: Date) => {
	try {
		const events = await prisma.events.findMany({
			where:{
				date,
			}
		})
		return events;
	} catch (e) {
		throw new Error(e.message);
	}
};

export { saveEvent, findEventsByDate };
