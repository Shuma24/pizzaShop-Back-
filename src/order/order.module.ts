import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzaSchema } from 'src/pizza/pizza.schema';
import { OrderController } from './order.controller';
import { OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Pizza', schema: PizzaSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
