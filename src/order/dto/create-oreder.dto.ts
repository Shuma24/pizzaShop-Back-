import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsArray()
  pizzas: [];

  @IsString()
  orderStatus: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  totalPrice: number;
}
