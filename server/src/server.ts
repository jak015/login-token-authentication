import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { clientUrl, port } from './config/env';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import { httpLogger, logger } from './utils/logger';

const app = express();

app.use(cors({
    origin: clientUrl,
    credentials: true
}));

app.use(express.json());
app.use(httpLogger);

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server started successfully, on port: ${port}`);
});