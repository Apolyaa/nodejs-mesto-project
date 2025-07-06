import {AnyZodObject, ZodError} from "zod";
import { Request, Response, NextFunction } from "express";
import STATUS_CODE from "../utils/consts/statusCodes";
import ERROR_MESSAGES from "../utils/consts/errorMessages";

export const validateRequest = (validator: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validator.parseAsync({
            body: req.body,
            params: req.params,
        });

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(STATUS_CODE.badRequest).send({ message: ERROR_MESSAGES.notValid } );
        }

        return res.status(STATUS_CODE.internalError).send({message: ERROR_MESSAGES.internalError});
    }
};
