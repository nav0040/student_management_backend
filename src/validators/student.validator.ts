import { z } from 'zod';

export const createStudentSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().email('Invalid email address').max(255),
  }),
});

export const updateStudentSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional(),
    email: z.string().email().max(255).optional(),
  }),
});

export const createMarkSchema = z.object({
  body: z.object({
    subject: z.string().min(1, 'Subject is required').max(100),
    score: z.number().int().min(0, 'Score cannot be negative').max(100, 'Score cannot exceed 100'),
  }),
});

export const paginationQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val) : 10)),
  }),
});
