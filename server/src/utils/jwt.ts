import jwt from "jsonwebtoken";
import { User } from "../types/user.types";
import { env } from "../config/env";
import { AuthenticationError } from "../errors/AppError";

export type JWTPayload = {
    sub: string;
    username: string;
};

export const signToken = (user: User) => {
    return jwt.sign(
        { username: user.username },
        env.jwtSecret,
        { subject: user.id, expiresIn: env.jwtExpiresIn }
    );
};

export const verifyToken = (token: string): JWTPayload => {
    try {
        return jwt.verify(token, env.jwtSecret) as JWTPayload;
    } catch {
        throw new AuthenticationError("Invalid or expired token");
    }
}