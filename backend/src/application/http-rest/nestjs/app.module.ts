import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { CoreModule } from './modules/app/core.module';
import { DatabaseModule } from './modules/database.module';
import { GuardModule } from './modules/guard.module';
import { EmailModule } from './modules/email.module';
import { EncryptionModule } from './modules/encryption.module';
import { PersistenceModule } from './modules/persistence.module';
import { ValidatorModule } from './modules/validator.module';

@Module({
  imports: [
    DatabaseModule,
    PersistenceModule,
    EncryptionModule,
    EmailModule,
    ValidatorModule,
    GuardModule,
    AuthModule,
    CoreModule,
  ],
})
export class ApplicationModule {}