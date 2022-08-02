import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { SortOrder } from 'mongoose';
import { JwtAuthGuard } from 'src/admin/guard/jwt.guard';
import { TelegramService } from 'src/telegram/telegram.service';
import { PizzaMessageDto } from './dto/MessagePizza.dto';
import { PizzaDto } from './dto/pizza.dto';
import { PizzaService } from './pizza.service';
import { CategoryType } from './types/category.type';

@Controller('pizza')
export class PizzaController {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly telegram: TelegramService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('createPizza')
  async createPizza(@Body() dto: PizzaDto) {
    const pizza = await this.pizzaService.create(dto);
    const msg =
      `Піцца: ${pizza.title}\n` + `Ціна: ${pizza.price}\n` + `Додана на сайт`;
    const telegram = await this.telegram.sendMessage(msg);
    return { pizza, telegram };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:slug')
  async deletePizza(@Param('slug') slug: string) {
    return await this.pizzaService.delete(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:slug')
  async UpdatePizza(@Param('slug') slug: string, @Body() dto: PizzaDto) {
    return await this.pizzaService.update(slug, dto);
  }

  @Get('one/:id')
  async getOnePizza(@Param('id') id: string) {
    return await this.pizzaService.get(id);
  }

  @Get('all')
  async getAllPizza(
    @Req() req: Request,
    @Query() sortProperty: object,
    @Query() sortValues: SortOrder,
    @Query() searchValue: object,
    @Query() category: CategoryType,
  ) {
    return await this.pizzaService.getAll(
      req,
      sortProperty,
      sortValues,
      searchValue,
      category,
    );
  }
}
