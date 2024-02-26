import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsSchemas } from './schemas/items-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemsSchemas }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
