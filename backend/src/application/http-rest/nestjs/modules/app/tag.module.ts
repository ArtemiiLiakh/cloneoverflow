import { Module } from '@nestjs/common';
import { NestTagController } from '../../controllers/tag.controller';
import { SearchModule } from './search.module';

@Module({
  controllers: [NestTagController],
  imports: [SearchModule],
})
export class TagModule {}