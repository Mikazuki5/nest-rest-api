import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsInterface } from './intefaces/item-interface';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateItemsDTO } from './dto/create-items.dto';
import { UpdateItemsDTO } from './dto/update-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Get()
  async findAll(@Query() query: ExpressQuery): Promise<ItemsInterface[]> {
    return this.itemService.getAllData(query);
  }

  @Get('/detail/:id')
  findById(@Param('id') id: string): Promise<ItemsInterface> {
    return this.itemService.getById(id);
  }

  @Post()
  create(@Body() createItemsDTO: CreateItemsDTO): Promise<ItemsInterface> {
    return this.itemService.create(createItemsDTO);
  }

  @Delete(':id')
  deleteItems(@Param('id') id: string): Promise<ItemsInterface> {
    return this.itemService.delete(id);
  }

  @Put(':id')
  updateItems(
    @Body() payload: UpdateItemsDTO,
    @Param('id') id: string,
  ): Promise<ItemsInterface> {
    return this.itemService.updateData(id, payload);
  }
}
