import {
  AccessTokenNotProvided,
  AccountBlockedException,
  RefreshTokenNotProvided,
  TokensIncompatible,
  UserUnauthorized,
  WrongAccessToken,
  WrongRefreshToken,
} from '@application/auth/exceptions';
import { addExceptionsToPayload } from './addExceptions';
import { EndpointDocumentationPayload } from './EndpointDocumentationPayload';

export const setAuthExceptions = (payload: EndpointDocumentationPayload): void => {
  if (!payload.exceptions) return;
  if (!payload.useAuthValidation) return;
  
  const optionalMessage = payload.useAuthValidation !== true && payload.useAuthValidation.optional ? ' (IF AUTHORIZED)' : '';

  addExceptionsToPayload(payload, [
    {
      title: 'Access and refresh tokens are incompatible'+optionalMessage,
      exception: new TokensIncompatible(),
    }, {
      title: 'Account is blocked'+optionalMessage,
      exception: new AccountBlockedException(),
    }, {
      title: 'User unauthorized'+optionalMessage,
      exception: new UserUnauthorized(),
    },
  ]);

  if (payload.useAuthValidation === true || payload.useAuthValidation.access) {
    addExceptionsToPayload(payload, [{
      title: 'Access token payload is wrong'+optionalMessage,
      exception: new WrongAccessToken(),
    }, {
      title: 'Access token was not provided'+optionalMessage,
      exception: new AccessTokenNotProvided(),
    }]);
  }

  if (payload.useAuthValidation === true || payload.useAuthValidation.refresh) {
    addExceptionsToPayload(payload, [{
      title: 'Refresh token was not provided'+optionalMessage,
      exception: new RefreshTokenNotProvided(),
    }, {
      title: 'Refresh token payload is wrong'+optionalMessage,
      exception: new WrongRefreshToken(),
    }]);
  }
};