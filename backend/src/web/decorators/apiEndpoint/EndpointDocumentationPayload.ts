import { Constructor } from '@common/utils/classTypes';
import { ApiExceptionPayload } from '../apiException.decorator';

export interface EndpointDocumentationPayload {
  path: string,
  summary: string,
  operationId: string,
  response: {
    statusCode: number,
    description?: string,
    type?: Constructor<unknown>
  }
  useAuthValidation?: {
    access?: true,
    refresh?: true,
    optional?: boolean,
  } | true,
  useDataValidation?: true,
  useRatingValidation?: true,
  useCodeValidation?: true,
  exceptions?: ApiExceptionPayload | ApiExceptionPayload[]
}
