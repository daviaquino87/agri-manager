import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<boolean> {
    try {
      const result = await this.prismaService.$queryRawUnsafe<number[]>('SELECT 1');
      return Array.isArray(result) && result.length > 0;
    } catch (error) {
      return false;
    }
  }
}
