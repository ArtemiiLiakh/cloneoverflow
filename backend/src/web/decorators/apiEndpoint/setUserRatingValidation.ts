import { RatingNotHighEnough, UserIdInvalid } from '@core/user/exceptions';
import { EndpointDocumentationPayload } from './EndpointDocumentationPayload';
import { addExceptionsToPayload } from './addExceptions';

export const setUserRatingValidation = (payload: EndpointDocumentationPayload): void => {
  addExceptionsToPayload(payload, [{
    title: 'User rating is not high',
    exception: new RatingNotHighEnough(),
  }, {
    title: 'User with that id not found',
    exception: new UserIdInvalid(),
  }]);
};