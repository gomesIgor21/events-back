import { UserType } from '../types/User';
import { prisma } from '../utils/prismaClient';

const saveUser = async (user: UserType) => {
	try {
		const saved = await prisma.users.create({
			data: {
				username: user.username,
				password: user.password,
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
		const user = prisma.users.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				password: true,
			},
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
	findByUsername,
	findUserById,
	updateUser,
	deleteUser,
	findAllUsers,
};
