import {z} from 'zod';

export const cardSchema = z.object({
    body: z.object({
        name: z.string().min(2).max(30),
        link: z.string()
    }),
});

export const cardIdSchema = z.object({
    params: z.object({
        cardId: z.string().length(24),
    }),
});