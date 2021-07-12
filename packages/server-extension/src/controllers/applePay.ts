import { asyncMiddleware, RequestContext, validateRequest } from '@server-extension/common';
import { NextFunction, Request, Response, Router } from 'express';
import createSession from '../services/payments/applePayService';
import { checkSchema } from 'express-validator';
import { schema } from './validation/applePaySchema';

const router = Router();

router.post(
  '/validate',
  checkSchema(schema),
  validateRequest,
  asyncMiddleware(async (req: Request, res: Response, _next: NextFunction) => {
    const validationUrl = <string>req.body.validationUrl;
    const requestContext = <RequestContext>req.app.locals;

    const response = await createSession(validationUrl, requestContext);

    res.json(response);
  })
);

export default router;
