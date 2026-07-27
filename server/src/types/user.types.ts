export type NewUser = {
    id: string;
    username: string;
    passwordHash: string;
};

export type User = Omit<NewUser, 'passwordHash'>;
