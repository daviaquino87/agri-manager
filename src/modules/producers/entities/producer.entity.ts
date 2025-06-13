import { Prisma } from '@prisma/client';

export interface IProducer {
  id?: string;
  name: string;
  document: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProducerWithRelations = Prisma.ProducerGetPayload<{
  include: {
    farms: {
      include: {
        farmCultures: {
          include: {
            crop: true;
            harvest: true;
          };
        };
      };
    };
  };
}>;
