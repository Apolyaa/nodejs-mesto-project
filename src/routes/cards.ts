import { Router } from 'express';
import {getCards, createCard, deleteCard, likeCard, dislikeCard} from '../controllers/cards'
import { validateRequest } from '../validation/validateRequest';
import { cardIdSchema, cardSchema } from '../validation/card';

const cardRouter = Router();
cardRouter.get('/', getCards);
cardRouter.post('/', validateRequest(cardSchema), createCard);
cardRouter.delete('/:cardId', validateRequest(cardIdSchema), deleteCard);
cardRouter.put('/:cardId/likes', validateRequest(cardIdSchema), likeCard);
cardRouter.delete('/:cardId/likes', validateRequest(cardIdSchema), dislikeCard);

export default cardRouter;