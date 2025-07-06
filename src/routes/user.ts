import { Router } from 'express';
import {getUserById, getUsers, createUser, updateUser, updateAvatar} from '../controllers/user'
import { validateRequest } from '../validation/validateRequest';
import { userIdSchema, userSchema, userUpdateAvatarSchema } from '../validation/user';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.post('/', validateRequest(userSchema), createUser);
userRouter.get('/:userId', validateRequest(userIdSchema), getUserById);
userRouter.patch('/me', validateRequest(userSchema), updateUser);
userRouter.patch('/me/avatar', validateRequest(userUpdateAvatarSchema), updateAvatar);

export default userRouter;