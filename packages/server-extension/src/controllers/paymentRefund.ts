import { asyncMiddleware, RequestContext, validateRequest } from '@server-extension/common';
import { NextFunction, Request, Response, Router } from 'express';
import refundPayment from '../services/payments/paymentRefundService';
import { checkSchema } from 'express-validator';
import { schema } from './validation/refundPaymentSchema';

const router = Router();

router.post(
  '/',
  checkSchema(schema),
  validateRequest,
  asyncMiddleware(async (req: Request, res: Response, _next: NextFunction) => {
    const refundRequest = <OCC.RefundPaymentRequest>req.body;
    const requestContext = <RequestContext>req.app.locals;
    const response = await refundPayment(refundRequest, requestContext);

    res.json(response);
  })
);

export default router;
