import type { Request, Response } from 'express';
import { authenticateUser, createUser, getUserById } from '../services/userService';
import { signToken } from '../utils/jwt';
import { env } from '../config/env';
import { AuthenticationError, ValidationError } from '../errors/AppError';
import { authSchema } from '../schemas/auth.schema';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const
};

const validateCredentials = (body: unknown) => {
    const result = authSchema.safeParse(body);

    if (!result.success) {
        const firstError = result.error.issues[0]?.message;
        throw new ValidationError(firstError);
    }

    return result.data;
};

export const register = async (req: Request, res: Response) => {
    const { username, password } = validateCredentials(req.body);

    const newUser = await createUser(username, password, req.log);
    req.log.info({ userId: newUser.id }, 'User registered successfully');

    return res.status(201).json(newUser);
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = validateCredentials(req.body);

    const authenticatedUser = await authenticateUser(username, password, req.log);
    const token = signToken(authenticatedUser);
    req.log.info({ userId: authenticatedUser.id }, 'User logged in successfully');

    res.cookie('token', token, { ...COOKIE_OPTIONS, maxAge: env.jwtExpiresIn * 1000 });
    return res.status(200).json(authenticatedUser);
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token', COOKIE_OPTIONS);
    return res.status(200).json({ message: 'Logged out successfully' });
};

export const me = async (req: Request, res: Response) => {
    const user = await getUserById(req.userId!, req.log);

    if (!user) {
        throw new AuthenticationError('User not found');
    }

    return res.status(200).json(user);
};