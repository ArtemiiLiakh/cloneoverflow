import { Module } from '@nestjs/common';
import { PrismaProvider } from '../../di/providers/database/PrismaProvider';
import { RedisProvider } from '../../di/providers/database/RedisProvider';

@Module({
  providers: [PrismaProvider, RedisProvider],
  exports: [PrismaProvider, RedisProvider],
})
export class DatabaseModule {} 