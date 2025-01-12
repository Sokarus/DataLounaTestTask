import express, {Application} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import itemRoutes from './routes/item';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/item', itemRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({error: 'Something went wrong!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
