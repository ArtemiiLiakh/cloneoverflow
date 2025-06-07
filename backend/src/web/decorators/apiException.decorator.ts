import { exampleExceptionMessage, Exception, ExceptionMessage } from '@cloneoverflow/common';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ContentObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ApiExceptionPayload {
  exception: Exception,
  title: string,
}

export const ApiExceptions = (path: string, status: number, ...exceptions: ApiExceptionPayload[]): MethodDecorator => {
  const content: ContentObject = Object.fromEntries(exceptions.map(({ exception, title }) => {
    if (exception.statusCode !== status) {
      throw new Error(`Status code differs from exception ${exception.constructor.name}: provided status ${status}, exception status ${exception.statusCode}`);
    }

    return [title, {
      schema: { allOf: [{ $ref: getSchemaPath(ExceptionMessage) }, { title: exception.constructor.name }] },
      example: exampleExceptionMessage(path, exception),
    }];
  }));

  return applyDecorators(
    ApiExtraModels(ExceptionMessage),
    ApiResponse({ 
      status,
      content,
      description: `Errors with ${status} status code`,
    }),
  );
};