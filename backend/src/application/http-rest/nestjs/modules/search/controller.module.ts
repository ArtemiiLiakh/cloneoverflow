import { Module } from '@nestjs/common';
import { NestSearchController } from '../../controllers/search.controller';
import { SearchControllerProvider } from '../../di/providers/controllers/SearchControllerProvider';
import { SearchServiceModule } from './service.module';

@Module({
  controllers: [NestSearchController],
  providers: [SearchControllerProvider],
  imports: [SearchServiceModule],
})
export class SearchControllerModule {}