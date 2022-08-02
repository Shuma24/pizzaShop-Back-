import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true, id: true })
export class Admin {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
