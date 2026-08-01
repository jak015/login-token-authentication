import type { Request, Response } from 'express';
import { authenticateUser, createUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const newUser = await createUser(username, password, req.log);
    req.log.info({ newUser }, 'User registered successfully');

    return res.status(201).json(newUser);
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const authenticatedUser = await authenticateUser(username, password, req.log);
    req.log.info({ authenticatedUser }, 'User logged in successfully');

    res.status(200).json(authenticatedUser);
};