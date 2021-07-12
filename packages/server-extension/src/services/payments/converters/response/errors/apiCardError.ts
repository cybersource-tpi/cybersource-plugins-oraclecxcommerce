import { PaymentContext } from '@server-extension/common';
import { pspResponseTypeMappings, responseCodeMappings } from '../common';

function apiErrorResponse(err: any, context: PaymentContext) {
  const { webhookRequest } = context;
  const pspResponseType = pspResponseTypeMappings[webhookRequest.transactionType];

  context.webhookResponse = <OCC.GenericPaymentWebhookResponse>{
    orderId: webhookRequest.orderId,
    channel: webhookRequest.channel,
    locale: webhookRequest.locale,
    transactionType: webhookRequest.transactionType,
    currencyCode: webhookRequest.currencyCode,

    [pspResponseType]: {
      transactionTimestamp: webhookRequest.transactionTimestamp,
      paymentId: webhookRequest.paymentId,
      transactionId: webhookRequest.transactionId,
      paymentMethod: webhookRequest.paymentMethod,
      gatewayId: webhookRequest.gatewayId,
      siteId: webhookRequest.siteId,
      authCode: 'DECLINED',
      responseCode: responseCodeMappings('DECLINED', webhookRequest.transactionType),
      responseReason: 'DECLINED',
      responseDescription: err.message,
      merchantTransactionId: webhookRequest.transactionId,
      merchantTransactionTimestamp: new Date().toISOString()
    }
  };
}

export default apiErrorResponse;
