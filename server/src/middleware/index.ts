import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  userId?: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ msg: 'Token Not Provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as CustomRequest).token = decoded;
    (req as CustomRequest).userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token Expired' });
  }
};
