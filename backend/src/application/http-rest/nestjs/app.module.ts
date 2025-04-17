import { Module } from '@nestjs/common';
import { ControllersModule } from './modules/controllers.module';
import { EmailModule } from './modules/email.module';
import { EncryptionModule } from './modules/encryption.module';
import { GlobalsModule } from './modules/globals.module';
import { ServicesModule } from './modules/services.module';

@Module({
  imports: [
    EncryptionModule,
    EmailModule,

    GlobalsModule,
    ServicesModule,
    ControllersModule,
  ],
})
export class ApplicationModule {}