import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import { httpLogger } from './utils/logger';
import cookieParser from 'cookie-parser';

export const createApp = () => {
    const app = express();

    app.use(cookieParser());

    app.use(cors({
        origin: env.clientUrl,
        credentials: true
    }));

    app.use(express.json());
    app.use(httpLogger);

    app.use('/api/auth', authRoutes);

    app.use(errorHandler);

    return app;
};
