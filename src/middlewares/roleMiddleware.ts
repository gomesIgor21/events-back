import { getUserFromJwt } from "../utils/jwt";

const roleMiddleware = (roles) => {
	return (req, res, next) => {
		try {
			const user = getUserFromJwt(req.headers['authorization'].split(' ')[1]);

			if (!roles.includes(user.role)) {
				throw new Error('Você não tem permissão!');
			}
			req.user = user;
			next();
		} catch (e) {
			log.error();
			res.status(403).json({error: e.message});
		}		
	};
};

const ROLE = {
	//Roles for the application
  GUEST: 'guest',
  ORGANIZER: 'organizer'
};

export {
	roleMiddleware,
	ROLE,
};