import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CategoryType } from '../types/category.type';

export class PizzaDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  types: number[];

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  sizes: number[];

  @IsOptional()
  slug: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: CategoryType;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
