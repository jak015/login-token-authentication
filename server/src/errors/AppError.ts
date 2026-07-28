export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    };
}

export class ValidationError extends AppError {
    constructor(message: string = 'Invalid input data') {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Resource conflict occurred') {
        super(message, 409);
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'Invalid username or password') {
        super(message, 401);
    }
}