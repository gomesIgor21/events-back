import { GuestType, OrganizerType, UserType } from '../types/User';
import { prisma } from '../utils/prismaClient';

const saveUser = async (user: UserType) => {
	try {
		const saved = await prisma.users.create({
			data: {
				username: user.username,
				password: user.password,
				role: user.role
			},
		});
		return saved;
	} catch (e) {
		throw new Error(e.message);
	}
};

const saveGuest = async (guest: GuestType) => {
	try {
		const saved = prisma.guests.create({
			data: {
				name: guest.name,
				phone: guest.phone,
				user_id: guest.user_id,
			},
		});
		return saved;
	} catch (e) {
		throw new Error(e.message);
	}
};

const saveOrganizer = async (organizer: OrganizerType) => {
	try {
		const saved = prisma.organizers.create({
			data: {
				name: organizer.name,
				phone: organizer.phone,
				user_id: organizer.user_id
			},
		});
		return saved;
	} catch (e) {
		throw new Error(e.message);
	}
};

const findByUsername = async (username: string) => {
	try {
		const user = await prisma.users.findUnique({
			where: {
				username,
			},
		});
		return user;
	} catch (e) {
		throw new Error(e.message);
	}
};

const findUserById = async (id: number) => {
	try {
		console.log("FindById")
		const user = await prisma.users.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				username: true,
				role: true
			}
		});
		return user;
	} catch (e) {
		throw new Error(e.message);
	}
};

const updateUser = async (user: UserType) => {
	try {
		const updated = await prisma.users.update({
			where: {
				id: user.id,
			},
			data: {
				username: user.username,
				password: user.password,
			},
			select: {
				id: true,
				username: true,
			},
		});
		return updated;
	} catch (e) {
		throw new Error(e.message);
	}
};

const deleteUser = async (id: number) => {
	try {
		await prisma.users.delete({
			where: {
				id,
			},
		});
	} catch (e) {
		throw new Error(e.message);
	}
};

const findAllUsers = async () => {
	try {
		const users = prisma.users.findMany({
			select: { id: true, password: true },
		});
		return users;
	} catch (e) {
		throw new Error(e.message);
	}
};

export {
	saveUser,
	saveGuest,
	saveOrganizer,
	findByUsername,
	findUserById,
	updateUser,
	deleteUser,
	findAllUsers,
};
