import { Prisma } from '@prisma/client';
import {
  deleteUser,
	findAllUsers,
	findByUsername,
	findUserById,
	saveGuest,
	saveOrganizer,
	saveUser,
  updateUser,
} from '../repository/userRepository';
import { GuestType, OrganizerType, UserRegisterType, UserType } from '../types/User';
import { checkPassword, encodePassword } from '../utils/bcrypt';
import { notFoundException } from '../utils/exceptions/notFoundException';
import { generateAccessToken } from '../utils/jwt';

const userRegister = async (payload: UserRegisterType) => {
	try {
		const userExists = await findByUsername(payload.user.username);

		if (!payload.user.username || !payload.user.password) {
			throw new Error('Preencha todos os campos!');
		}

		if (userExists) {
			throw new Error('Usuário já cadastrado!');
		}
		let pass = await encodePassword(payload.user.password);

		let user = {
			username: payload.user.username,
			password: pass,
			role: payload.user.role
		}

		const registered = await saveUser(user);
		
		if(user.role === 'guest'){
			let guest: GuestType = {
				...payload.guest,
				user_id: registered.id
			}

			await saveGuest(guest);
		}
		
		if(user.role === 'organizer'){
			let organizer: OrganizerType = {
				...payload.organizer,
				user_id: registered.id
			}

			await saveOrganizer(organizer);
		}

		return registered;
	} catch (e) {
		throw new Error(e.message);
	}
};

const signIn = async ({ username, password }) => {
	try {
		const exists = await findByUsername(username);

		if (!exists) throw new Error(notFoundException('usuário'));

		const passwordMatch = await checkPassword(exists.password, password);
		if (!passwordMatch) throw new Error('Senha incorreta');

		const token = generateAccessToken(exists);
		if (!token) {
			throw new Error("Error ao gerar token");
		}

		return token;
	} catch (e) {
		throw new Error(e.message);
	}
};

const userFindById = async (id: string) => {
	try {
		const user = await findUserById(Number(id));
		if (!user) throw new Error(notFoundException('usuário'));
		return user;
	} catch (e) {
		throw new Error(e.message);
	}
};

const userUpdate = async (user) => {
	try {
		const toUpdate = await findUserById(user.id);
		if (!toUpdate) throw Error(notFoundException('usuário'));

		const updated = await updateUser(user);
		return updated;
	} catch (e) {
		throw new Error(e.message);
	}
};

const userDelete = async (id) => {
	try {
		const exists = await findUserById(id);
		if (!exists) throw new Error(notFoundException('usuário'));
		await deleteUser(id);
	} catch (e) {
		throw new Error(e.message);
	}
};

const userFindAll = async () => {
	try {
		const users = await findAllUsers();
		if (!users) throw new Error(notFoundException('usuário'));
		
		return users;
	} catch (e) {
		throw new Error(e.message);
	}
};

export {
	signIn,
	userDelete,
	userFindAll,
	userFindById,
	userRegister,
	userUpdate,
};
