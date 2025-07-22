import { z } from 'zod';

export const userSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(30).optional(),
    about: z.string().min(2).max(200).optional(),
    avatar: z.string().url().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    userId: z.string().length(24),
  }),
});

export const userUpdateAvatarSchema = z.object({
  body: z.object({
    avatar: z.string().url(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});
