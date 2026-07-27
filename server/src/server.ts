import express, { type Request, type Response } from 'express';
import { port } from './config/env';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});