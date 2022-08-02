import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './dto/create-oreder.dto';
import { OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Pizza') private readonly OrederRepo: Model<OrderDocument>,
  ) {}

  async CreateOrder(dto: CreateOrderDTO): Promise<OrderDocument> {
    const findPizza = await this.OrederRepo.find().populate('Pizza', 'title');

    console.log(findPizza);
    const order = new this.OrederRepo();
    Object.assign(order, dto);
    return order.save();
  }
}
