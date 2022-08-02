import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryType } from './types/category.type';

export type PizzaDocument = Pizza & Document;

@Schema({ id: true })
export class Pizza {
  @Prop()
  imageUrl: string;

  @Prop({ type: String, unique: true, text: true })
  title: string;

  @Prop()
  types: number[];

  @Prop()
  sizes: number[];

  @Prop()
  slug: string;

  @Prop()
  price: number;

  @Prop()
  category: CategoryType;

  @Prop()
  rating: number;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
