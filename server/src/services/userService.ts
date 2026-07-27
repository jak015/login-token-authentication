import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";
import { ConflictError, ValidationError } from "../errors/index.js";
import type { NewUser, User } from "../types/user.types";

const users: NewUser[] = [];

const SALT_ROUNDS = 12;

const encryptPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

const toUser = (user: NewUser): User => ({ id: user.id, username: user.username });

export const createUser = async (username: string, password: string): Promise<User> => {
    if (!username || !password) {
        throw new ValidationError('Username and password are required');
    }

    if (users.some((u) => u.username === username)) {
        throw new ConflictError('Username already exists');
    }

    const encryptedPassword = await encryptPassword(password);

    const newUser: NewUser = {
        id: uuidv7(),
        username,
        passwordHash: encryptedPassword
    };

    users.push(newUser);
    return toUser(newUser);
};

export const getAllUsers = (): User[] => users.map(toUser);