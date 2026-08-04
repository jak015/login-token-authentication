import { v7 as uuidv7 } from "uuid";
import type { NewUser, User } from "../types/user.types";
import { AuthenticationError, ConflictError, ValidationError } from "../errors/AppError";
import { logger } from "../utils/logger";
import type { Logger } from "pino";
import { comparePassword, hashPassword } from "../utils/password";

const users: NewUser[] = [];
const pendingUsernames = new Set<string>();

const toUser = (user: NewUser): User => ({ id: user.id, username: user.username });

export const createUser = async (username: string, password: string, log: Logger = logger): Promise<User> => {
    if (!username || !password) {
        log.warn({ username }, 'User creation failed due to missing credentials');
        throw new ValidationError('Username and password are required');
    }

    if (pendingUsernames.has(username) || users.some((u) => u.username === username)) {
        log.warn({ username }, 'User creation failed because the username already exists');
        throw new ConflictError('Username is already taken');
    }

    pendingUsernames.add(username);

    try {
        const encryptedPassword = await hashPassword(password);

        const newUser: NewUser = {
            id: uuidv7(),
            username,
            passwordHash: encryptedPassword
        };

        users.push(newUser);
        log.info({ userId: newUser.id }, 'User created successfully');
        return toUser(newUser);
    } finally {
        pendingUsernames.delete(username);
    }
};

export const authenticateUser = async (username: string, password: string, log: Logger = logger): Promise<User> => {
    if (!username || !password) {
        log.warn('Authentication failed due to missing credentials');
        throw new ValidationError('Username and password are required');
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
        log.warn('Authentication failed because the user does not exist');
        throw new AuthenticationError();
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
        log.warn('Authentication failed due to invalid password');
        throw new AuthenticationError();
    }

    log.info({ userId: user.id }, 'User authenticated successfully');
    return toUser(user);
};