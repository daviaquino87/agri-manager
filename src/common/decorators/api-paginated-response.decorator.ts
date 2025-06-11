import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiPaginatedResponse = <
  TModel extends Type<any>,
  TAdditionalModel extends Type<any>,
>(
  model: TModel,
) => {
  const schema: SchemaObject & Partial<ReferenceObject> = {
    title: `PaginatedResponseOf${model.name}`,
    allOf: [
      {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
      {
        properties: {
          meta: {
            type: 'object',
            properties: {
              total: { type: 'number' },
              lastPage: { type: 'number' },
              currentPage: { type: 'number' },
              perPage: { type: 'number' },
              prev: { type: 'number' },
              next: { type: 'number' },
            },
          },
        },
      },
    ],
  };

  return applyDecorators(
    ApiOkResponse({
      schema,
    }),
  );
};
