import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

// Cors is a security-based function, it will specify which front-end should be able to access back-end, no params means that everyone is able.
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 5554, () => console.log('Running...'));
