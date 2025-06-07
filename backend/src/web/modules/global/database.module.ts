import { Module } from '@nestjs/common';
import { PrismaProvider } from '@web/di/providers/database/PrismaProvider';
import { RedisProvider } from '@web/di/providers/database/RedisProvider';

@Module({
  providers: [PrismaProvider, RedisProvider],
  exports: [PrismaProvider, RedisProvider],
})
export class DatabaseModule {} 