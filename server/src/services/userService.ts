import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";
import { SALT_ROUNDS } from "../config/env";
import type { NewUser, User } from "../types/user.types";
import { ConflictError, ValidationError } from "../errors/AppError";
import { logger } from "../utils/logger";
import type { Logger } from "pino";

const users: NewUser[] = [];
const pendingUsernames = new Set<string>();

const encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

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
        const encryptedPassword = await encryptPassword(password);

        const newUser: NewUser = {
            id: uuidv7(),
            username,
            passwordHash: encryptedPassword
        };

        users.push(newUser);
        log.info({ userId: newUser.id, username }, 'User created successfully');
        return toUser(newUser);
    } finally {
        pendingUsernames.delete(username);
    }
};