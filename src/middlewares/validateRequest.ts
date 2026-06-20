import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: ZodType<any, any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = parsed.body || req.body;
      req.query = parsed.query || req.query;
      next();
    } catch (error) {
      next(error);
    }
  };
};
