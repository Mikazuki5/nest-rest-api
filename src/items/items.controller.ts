import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsInterface } from './intefaces/item-interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Get()
  findAll(): Promise<ItemsInterface[]> {
    return this.itemService.getAllData();
  }

  @Get('/detail/:id')
  findById(@Param('id') id: string): Promise<ItemsInterface> {
    return this.itemService.getById(id);
  }

  @Post()
  create(@Body() createItemsDTO: ItemsInterface): Promise<ItemsInterface> {
    return this.itemService.create(createItemsDTO);
  }

  @Delete(':id')
  deleteItems(@Param('id') id: string): Promise<ItemsInterface> {
    return this.itemService.delete(id);
  }

  @Put(':id')
  updateItems(
    @Body() payload: ItemsInterface,
    @Param('id') id: string,
  ): Promise<ItemsInterface> {
    return this.itemService.updateData(id, payload);
  }
}
