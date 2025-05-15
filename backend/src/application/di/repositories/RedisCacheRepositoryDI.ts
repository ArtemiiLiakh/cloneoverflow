import { RedisCacheRepository } from '@infrastructure/persistance/cache/RedisCacheRepository';
import { RedisDatabaseDI } from '../database/RedisDatabaseDI';

export const RedisCacheRepositoryDI = new RedisCacheRepository(RedisDatabaseDI);