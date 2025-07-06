import {z} from 'zod';

export const userSchema = z.object({
    body: z.object({
        name: z.string().min(2).max(30),
        about: z.string().min(2).max(200),
        avatar: z.string(),
    }),
});

export const userIdSchema = z.object({
    params: z.object({
        userId: z.string().length(24),
    }),
});

export const userUpdateAvatarSchema = z.object({
    body: z.object({
        avatar: z.string()
    }),
});