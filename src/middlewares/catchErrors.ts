import { NextFunction, Request, Response } from 'express';
import STATUS_CODE from '../utils/consts/statusCodes';
import ERROR_MESSAGES from '../utils/consts/errorMessages';

const catchErrors = (err: any, req: Request, res: Response, _: NextFunction) => {
  const message = err.message || ERROR_MESSAGES.internalError;
  res
    .status(err.status || STATUS_CODE.internalError)
    .send({message});
};

export default catchErrors;
