import { Injectable } from '@nestjs/common';
import { ItemsInterface } from './intefaces/item-interface';

// import { v4 as uuidV4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private itemModels: Model<ItemsInterface>) {}
  async getAllData(): Promise<ItemsInterface[]> {
    return await this.itemModels.find();
  }

  async getById(id: string): Promise<ItemsInterface> {
    return await this.itemModels.findById({ _id: id });
  }

  async create(item: ItemsInterface): Promise<ItemsInterface> {
    const newItems = new this.itemModels({
      ...item,
      createdAt: new Date(),
    });
    return await newItems.save();
  }

  async delete(id: string): Promise<ItemsInterface> {
    return this.itemModels.findByIdAndDelete(id);
  }

  async updateData(
    id: string,
    payload: ItemsInterface,
  ): Promise<ItemsInterface> {
    return await this.itemModels.findByIdAndUpdate(
      id,
      {
        ...payload,
        updatedAt: new Date(),
      },
      { new: true },
    );
  }
}
