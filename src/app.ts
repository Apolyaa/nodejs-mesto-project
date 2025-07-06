import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user';
import cardRouter from './routes/cards';
import catchErrors from './middlewares/catchErrors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6869197097bf7a3fa11a4fed'
  };
  
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(catchErrors);

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`)
})