import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Internal server error';

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        req.log.warn({ statusCode, message }, 'Request failed with application error');
    } else if (error instanceof Error) {
        req.log.error({ message: error.message, stack: error.stack }, 'Unhandled request error');
    } else {
        req.log.error('Unknown error occurred');
    }

    res.err = error instanceof Error ? error : new Error(message);
    res.status(statusCode).json({ message });
};