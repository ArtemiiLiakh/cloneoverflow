import { RedisCacheRepository } from '@infrastructure/persistance/redis/RedisCacheRepository';
import RedisDatabaseDI from '../database/RedisDatabaseDI';

export default new RedisCacheRepository(RedisDatabaseDI);