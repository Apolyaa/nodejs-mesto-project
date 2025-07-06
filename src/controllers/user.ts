import { NextFunction, Request, Response } from 'express';
import User from '../model/user';
import ResponseError from '../utils/responseError';
import ERROR_MESSAGES from '../utils/consts/errorMessages';
import STATUS_CODE from '../utils/consts/statusCodes';

export const getUsers = async function(_: Request, res: Response, next: NextFunction) {
    try {
    const users = await User.find({});
    res.send(users);
  } catch {
    next(ResponseError.getInternalError());
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user){
      next(new ResponseError({
        message: ERROR_MESSAGES.userNotFound,
        status: STATUS_CODE.notFound,
      }));
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about, avatar },
      { new: true, runValidators: true });

    if (!user) {
      next(new ResponseError({
        message: ERROR_MESSAGES.userNotFound,
        status: STATUS_CODE.notFound,
      }));
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
}

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true });

    if (!user) {
      next(new ResponseError({
        message: ERROR_MESSAGES.userNotFound,
        status: STATUS_CODE.notFound,
      }));
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
}