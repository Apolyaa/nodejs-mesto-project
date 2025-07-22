import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../model/user';
import ResponseError from '../utils/responseError';
import ERROR_MESSAGES from '../utils/consts/errorMessages';
import STATUS_CODE from '../utils/consts/statusCodes';
import getIsMongoError from '../utils/getIsMongoError';

const { JWT_SECRET = '' } = process.env;

export const getUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      10,
    );

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(STATUS_CODE.created).send(userWithoutPassword);
  } catch (error) {
    if (getIsMongoError(error) && error.code === 11000) {
      next(new ResponseError({
        message: ERROR_MESSAGES.userAlreadyExists,
        status: STATUS_CODE.conflict,
      }));
      return;
    }
    next(ResponseError.getInternalError());
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      next(
        new ResponseError({
          message: ERROR_MESSAGES.userNotFound,
          status: STATUS_CODE.notFound,
        }),
      );
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about, avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      next(
        new ResponseError({
          message: ERROR_MESSAGES.userNotFound,
          status: STATUS_CODE.notFound,
        }),
      );
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      next(
        new ResponseError({
          message: ERROR_MESSAGES.userNotFound,
          status: STATUS_CODE.notFound,
        }),
      );
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      next(new ResponseError({
        message: ERROR_MESSAGES.passwordOrEmailIncorrect,
        status: STATUS_CODE.unauthorized,
      }));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      next(new ResponseError({
        message: ERROR_MESSAGES.passwordOrEmailIncorrect,
        status: STATUS_CODE.unauthorized,
      }));
      return;
    }

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: ('7d' as SignOptions['expiresIn']) },
    );

    res
      .cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 604800000,
      })
      .send({ message: 'Авторизация успешна' });
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id);

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
};
