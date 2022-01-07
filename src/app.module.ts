import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { TwiliooModule } from './twilioo/twilioo/twilioo.module';
import { SmsService } from './twilioo/sms.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
  }),
  TypeOrmModule.forRoot(),
  AuthModule,
  UserModule,
  TicketModule,
  TwiliooModule
  ],
  controllers: [AppController],
  providers: [AppService, SmsService,],
})
export class AppModule {}
