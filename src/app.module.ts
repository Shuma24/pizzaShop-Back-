import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { mongooseConfig } from './configs/mongose.config';
import { getTelegramConfig } from './configs/telegram.config';
import { PizzaModule } from './pizza/pizza.module';
import { TelegramModule } from './telegram/telegram.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseConfig,
    }),
    AdminModule,
    PizzaModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
