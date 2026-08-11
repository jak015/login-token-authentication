import type { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../errors/AppError';
import { verifyToken } from '../utils/jwt';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        throw new AuthenticationError('Not authenticated');
    }

    const payload = verifyToken(token);
    req.userId = payload.sub;

    next();
}