import { NextFunction, Request, Response } from 'express';
import Card from '../model/card';
import ResponseError from '../utils/responseError';
import STATUS_CODE from '../utils/consts/statusCodes';
import ERROR_MESSAGES from '../utils/consts/errorMessages';

export const getCards = async function(_: Request, res: Response, next: NextFunction) {
    try {
    const cards = await Card.find({});
    res.send(cards);
  } catch {
    next(ResponseError.getInternalError());
  }
}

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send(card);
  } catch {
    next(ResponseError.getInternalError());
  }
}

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      next(new ResponseError({
        message: ERROR_MESSAGES.cardNotFound,
        status: STATUS_CODE.notFound,
      }));
      return;
    }
    const saved = card.toObject();
    await card.deleteOne();
    res.send(saved);
  } catch (err) {
    next(ResponseError.getInternalError());
  }
}

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      next(new ResponseError({
        message: ERROR_MESSAGES.cardNotFound,
        status: STATUS_CODE.notFound,
      }));
      return;
    }

    res.send(card);
  } catch (err) {
    next(ResponseError.getInternalError());
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      next(new ResponseError({
        message: ERROR_MESSAGES.cardNotFound,
        status: STATUS_CODE.notFound,
      }));
      return;
    }

    res.send(card);
  } catch (err) {
    next(ResponseError.getInternalError());
  }
};