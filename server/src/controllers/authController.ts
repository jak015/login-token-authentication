import type { Request, Response } from 'express';
import { createUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const newUser = await createUser(username, password, req.log);
    req.log.info({ newUser }, 'User registered successfully');

    return res.status(201).json(newUser);
};

export const login = (req: Request, res: Response) => {
    res.status(501).json({ message: 'Login not implemented yet' });
};