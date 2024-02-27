import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemsInterface } from './intefaces/item-interface';

// import { v4 as uuidV4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Items } from './schemas/items-schema';

import { Query } from 'express-serve-static-core';
import { CreateItemsDTO } from './dto/create-items.dto';
import { UpdateItemsDTO } from './dto/update-items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name) private itemModels: Model<ItemsInterface>,
  ) {}
  async getAllData(query: Query): Promise<ItemsInterface[]> {
    const resPerPage = +query.perPage || 10;
    const currentPage = +query.page || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.productName
      ? {
          name: {
            $regex: query.productName,
            $options: 'i',
          },
        }
      : {};

    const data: ItemsInterface[] = await this.itemModels
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return data;
  }

  async getById(id: string): Promise<ItemsInterface> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please insert correct id from product');
    }

    const data = await this.itemModels.findById({ _id: id });

    if (!data) {
      throw new NotFoundException('Data product not found');
    }

    return data;
  }

  async create(item: CreateItemsDTO): Promise<ItemsInterface> {
    const newItems = new this.itemModels(item);
    return await newItems.save();
  }

  async delete(id: string): Promise<ItemsInterface> {
    return this.itemModels.findByIdAndDelete(id);
  }

  async updateData(
    id: string,
    payload: UpdateItemsDTO,
  ): Promise<ItemsInterface> {
    return await this.itemModels.findByIdAndUpdate(id, payload, { new: true });
  }
}
