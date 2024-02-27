import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Items, ItemsSchemas } from './schemas/items-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchemas }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
