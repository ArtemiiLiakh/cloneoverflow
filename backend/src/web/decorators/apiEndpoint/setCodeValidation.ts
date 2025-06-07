import { MissingVerificationCode, VerificationCodeNotMatch } from '@application/auth/exceptions';
import { addExceptionsToPayload } from './addExceptions';
import { EndpointDocumentationPayload } from './EndpointDocumentationPayload';
import { RetriesExpiredException } from '@cloneoverflow/common';

export const setCodeValidation = (payload: EndpointDocumentationPayload): void => {
  addExceptionsToPayload(payload, [{
    title: 'Missing verification code',
    exception: new MissingVerificationCode(),
  }, {
    title: 'Retries of sending code expired',
    exception: new RetriesExpiredException(),
  }, {
    title: 'Code does not match',
    exception: new VerificationCodeNotMatch(),
  }]);
};