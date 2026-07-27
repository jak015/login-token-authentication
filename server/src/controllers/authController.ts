import type { Request, Response } from 'express';
import { AppError } from '../errors/index.js';
import { createUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const newUser = await createUser(username, password);
        return res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error('Unhandled error in register:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = () => { };