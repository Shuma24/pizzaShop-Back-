import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-oreder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@Body() dto: CreateOrderDTO) {
    return await this.orderService.CreateOrder(dto);
  }
}
