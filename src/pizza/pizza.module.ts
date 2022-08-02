import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramModule } from 'src/telegram/telegram.module';
import { PizzaController } from './pizza.controller';
import { PizzaSchema } from './pizza.schema';
import { PizzaService } from './pizza.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pizza', schema: PizzaSchema }]),
    TelegramModule,
  ],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class PizzaModule {}
