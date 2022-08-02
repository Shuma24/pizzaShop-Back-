import { IsNotEmpty, IsString } from 'class-validator';

export class PizzaMessageDto {
  title: string;

  price: number;
}
