import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { isValidObjectId, Model, SortOrder } from 'mongoose';
import slugify from 'slugify';
import { PizzaDto } from './dto/pizza.dto';
import { PizzaDocument } from './pizza.schema';
import { CategoryType } from './types/category.type';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel('Pizza') private readonly PizzaRepo: Model<PizzaDocument>,
  ) {}

  //create business logic!
  async create(dto: PizzaDto): Promise<PizzaDocument> {
    const pizza = new this.PizzaRepo();
    Object.assign(pizza, dto);

    pizza.slug = this.getSlug(dto.title);

    return pizza.save();
  }

  // delete business logic!
  async delete(slug: string) {
    const deletePizza = await this.PizzaRepo.deleteOne({ slug: slug }).exec();
    if (deletePizza.deletedCount === 0) {
      return new HttpException(
        'Error, pizza slug incorrect or smth error',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return deletePizza;
    }
  }

  // update business logic!
  async update(
    slug: string,
    dto: PizzaDto,
  ): Promise<PizzaDocument | HttpException> {
    const updatePizza = await this.PizzaRepo.findOneAndUpdate(
      { slug: slug },
      dto,
    ).exec();

    if (!updatePizza) {
      return new HttpException('Pizza not Found', HttpStatus.NOT_FOUND);
    } else {
      return updatePizza;
    }
  }

  async get(id: string): Promise<PizzaDocument | HttpException> {
    if (isValidObjectId(id)) {
      return await this.PizzaRepo.findById(id).exec();
    } else {
      return new HttpException('Pizza not Found', HttpStatus.NOT_FOUND);
    }
  }

  //query and all business logic!
  async getAll(
    req: Request,
    sortProperty: object,
    sortValues: SortOrder,
    searchValue: object,
    category: CategoryType,
  ) {
    let option: {} = {};
    if (req.query.category) {
      option = {
        $or: [
          {
            category: new RegExp(category['category'], 'i'),
          },
        ],
      };
    }

    if (req.query.search) {
      option = {
        $or: [
          {
            title: new RegExp(searchValue['search'], 'i'),
          },
        ],
      };
    }

    const find = this.PizzaRepo.find(option);

    if (req.query.sortBy) {
      find.sort({
        [sortProperty['sortBy']]: 'asc',
      });
    }

    if (req.query.order) {
      try {
        find.sort({
          [sortProperty['sortBy']]: sortValues['order'],
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          return {
            message: `(${err.message})`,
          };
        }
      }
    }

    const page: number = parseInt(req.query.page as any) || 1;
    const limit: number = +req.query.limit || 4;
    const total: number = await this.PizzaRepo.count(option);
    const data = await find
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return {
      data,
      pages: page,
      total: total,
      last_page: Math.ceil(total / limit),
    };
  }

  //help func
  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
