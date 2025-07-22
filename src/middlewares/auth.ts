import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ResponseError from '../utils/responseError';
import ERROR_MESSAGES from '../utils/consts/errorMessages';
import getCookie from '../utils/getCookie';
import STATUS_CODE from '../utils/consts/statusCodes';

export default (req: Request, _: Response, next: NextFunction) => {
  const jwtValue = getCookie('jwt', req.headers.cookie);
  console.log(jwtValue);
  if (!jwtValue) {
    next(new ResponseError({
      message: ERROR_MESSAGES.authRequired,
      status: STATUS_CODE.unauthorized,
    }));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(jwtValue, 'secret');
  } catch (err) {
    next(new ResponseError({
      message: ERROR_MESSAGES.invalidToken,
      status: STATUS_CODE.unauthorized,
    }));
    return;
  }

  req.user = payload as { _id: string };

  next();
};
