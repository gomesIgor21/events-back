import { findEventsByDate, saveEvent } from "../repository/eventRepository";
import { EventType } from "../types/EventType";

const eventCreate = async (payload: EventType) => {
	try {
		let event: EventType = {
			...payload,
			date: new Date(payload.date)
		}
		const event = await saveEvent(payload);
		return event;
	} catch (e) {
		throw new Error(e.message);
	}
};

const eventsFindByDate = async (payload: string) => {
  try {
		const date = new Date(payload);
		const events = await findEventsByDate(date);
		return events;
  } catch (e) {
    throw new Error(e.message);
  }
};
export { eventCreate, eventsFindByDate }