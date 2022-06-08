import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
	try {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) throw new Error('Token não foi inserido corretamente');
    
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    if(!verified) throw new Error("Token inválido")  
    
    req.payload = verified;
    next();
    return;
  } catch (err) {
    const e = err as Error
    res.status(403).json({error: e.message})
  }
}

export {authMiddleware}