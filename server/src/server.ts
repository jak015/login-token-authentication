import express, { type Request, type Response } from 'express';
import { port } from './config/env';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import { httpLogger, logger } from './utils/logger';

const app = express();

app.use(express.json());
app.use(httpLogger);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server started successfully, on port: ${port}`);
});