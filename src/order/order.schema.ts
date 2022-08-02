import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Pizza } from 'src/pizza/pizza.schema';
import { ORDER_STATUS_ENUM } from './enum/order-status.enum';

export type OrderDocument = Order & Document;

@Schema({ _id: true, timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' })
  pizzas: Pizza;

  @Prop({
    enum: ORDER_STATUS_ENUM,
    default: ORDER_STATUS_ENUM.CREATED,
    required: true,
  })
  orderStatus: ORDER_STATUS_ENUM;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: 0 })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
