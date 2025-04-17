import { Module } from '@nestjs/common';
import { DatabaseModule } from './global/database.module';
import { GuardModule } from './global/guard.module';
import { PersistenceModule } from './global/persistence.module';
import { ValidatorModule } from './global/validator.module';

@Module({
  imports: [
    DatabaseModule,
    ValidatorModule,
    GuardModule,
    PersistenceModule,
  ],
})
export class GlobalsModule {}