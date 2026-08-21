function envNumber(value: string | undefined, fallback: number): number {
    if (!value || !value.trim()) return fallback;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
}
const MIN_JWT_SECRET_LENGTH = 32;

const requireEnv = (key: string, minLength?: number) => {
    const value = process.env[key];

    if (!value || !value.trim()) {
        throw new Error(`${key} env variable is required`);
    }

    if (minLength && value.length < minLength) {
        throw new Error(`${key} env variable must be at least ${minLength} characters`);
    }

    return value;
};

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    isProduction: process.env.NODE_ENV === 'production',
    port: envNumber(process.env.PORT, 3000),
    saltRounds: envNumber(process.env.SALT_ROUNDS, 12),
    clientUrl: requireEnv("CLIENT_URL"),
    jwtSecret: requireEnv("JWT_SECRET", MIN_JWT_SECRET_LENGTH),
    jwtExpiresIn: envNumber(process.env.JWT_EXPIRES_IN_SECONDS, 3600)
};