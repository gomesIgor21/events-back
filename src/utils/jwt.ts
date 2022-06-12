import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { UserType } from '../types/User';

const secret = process.env.TOKEN_SECRET || 'UM_SEGREDO'

const generateAccessToken = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
			role: user.role
		},
		secret,
		{ expiresIn: '12h' }
	);
  
	return token;
};

const getUserFromJwt = (jwtToken) => {
	const token = jwt.decode(jwtToken, {json: true});
	return {
		id: token.id,
		username: token.username,	
	};
};

export {
	generateAccessToken,
	getUserFromJwt,
};