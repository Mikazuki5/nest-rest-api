import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchemas } from './schemas/order-schemas';
import { AuthModule } from 'src/auth/auth.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [
    ItemsModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchemas }]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
