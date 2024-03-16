import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order-schemas';
import { Model } from 'mongoose';
import { OrderInterface } from './interface/order-interface';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderService: Model<OrderInterface>,
    @Inject(ItemsService) private itemService: ItemsService,
  ) {}

  async createOrder(order: CreateOrderDTO): Promise<OrderInterface> {
    const newOrder = new this.orderService(order);
    const getDetailItems = await this.itemService.getById(order.productId);
    const updateItems = await this.itemService.updateData(order.productId, {
      qty: getDetailItems.qty - order.qty,
      productName: getDetailItems.productName,
      productDescription: getDetailItems.productDescription,
      brand: getDetailItems.brand,
      category: getDetailItems.category,
    });

    const result = newOrder.save();

    if (order.qty > getDetailItems.qty) {
      throw new BadRequestException('QTYnya kelebihan dari qty product');
    }

    if (result) {
      updateItems;
      return result;
    } else {
      throw new NotFoundException('Gagal');
    }
  }

  async getOrder(): Promise<OrderInterface[]> {
    const data: OrderInterface[] = await this.orderService
      .find()
      .populate('productId');

    return data;
  }
}
