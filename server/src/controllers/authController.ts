import type { NextFunction, Request, Response } from 'express';
import { createUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const newUser = await createUser(username, password);
    return res.status(201).json(newUser);
};

export const login = () => { };