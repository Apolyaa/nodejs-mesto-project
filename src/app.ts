import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user';
import cardRouter from './routes/cards';
import catchErrors from './middlewares/catchErrors';
import auth from './middlewares/auth';
import { createUser, login } from './controllers/user';
import ResponseError from './utils/responseError';
import ERROR_MESSAGES from './utils/consts/errorMessages';
import STATUS_CODE from './utils/consts/statusCodes';
import { errorLogger, requestLogger } from './middlewares/logger';
import { loginSchema, userSchema } from './validation/user';
import { validateRequest } from './validation/validateRequest';

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.use(express.json());
app.post('/signin', validateRequest(loginSchema), login);
app.post('/signup', validateRequest(userSchema), createUser);
app.use(auth, userRouter);
app.use(auth, cardRouter);

app.all('*', (req, res, next) => {
  next(new ResponseError({
    message: ERROR_MESSAGES.notFound,
    status: STATUS_CODE.notFound,
  }));
});

app.use(errorLogger);
app.use(catchErrors);

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});
