import { Prisma } from '@prisma/client';
import {
  deleteUser,
	findAllUsers,
	findByUsername,
	findUserById,
	saveUser,
  updateUser,
} from '../repository/userRepository';
import { UserType } from '../types/User';
import { checkPassword } from '../utils/bcrypt';
import { notFoundException } from '../utils/exceptions/notFoundException';
import { generateAccessToken } from '../utils/jwt';

const userRegister = async (user: UserType) => {
	try {
		const userExists = await findByUsername(user.username);

		if (!user.username || !user.password) {
			throw new Error('Preencha todos os campos!');
		}

		if (userExists) {
			throw new Error('Usuário já cadastrado!');
		}

		const registered = await saveUser(user);
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

		return { token };
	} catch (e) {
		throw new Error(e.message);
	}
};

const userFindById = async (id) => {
	try {
		const user = await findUserById(id);
		if (!user) throw new Error(notFoundException('usuário'));
		return user;
	} catch (e) {
		throw new Error();
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
