import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
    const result = newOrder.save();

    await this.validateStockItems(order.qty, order.productId);

    if (result) {
      await this.updateStockItem(order.qty, order.productId);
      return result;
    } else {
      throw new BadRequestException('Error!', {
        cause: new Error(),
        description: 'Opps, please check again your request order!',
      });
    }
  }

  async getOrder(): Promise<OrderInterface[]> {
    const data: OrderInterface[] = await this.orderService.find();

    return data;
  }

  async getOrderDetail(id: string) {
    const detailData = await this.orderService
      .findById({ _id: id })
      .populate('productId', 'productName');

    if (!detailData) {
      throw new BadRequestException('Id tidak ditemukan');
    }
    return detailData.toJSON();
  }

  async validateStockItems(qty: number, productId: string) {
    const getDetailItems = await this.itemService.getById(productId);

    if (getDetailItems.qty === 0 || getDetailItems.qty < 0) {
      throw new BadRequestException('Opps, Product out of stock!', {
        cause: new Error(),
        description: 'Out of stock!',
      });
    }

    if (qty > getDetailItems.qty) {
      throw new BadRequestException(
        'The quantity of stock ordered cannot exceed the available stock!',
        {
          cause: new Error(),
          description: 'Error!',
        },
      );
    }
  }

  async updateStockItem(qty: number, productId: string) {
    const getDetailItems = await this.itemService.getById(productId);
    return await this.itemService.updateData(productId, {
      qty: getDetailItems.qty - qty,
      productName: getDetailItems.productName,
      productDescription: getDetailItems.productDescription,
      brand: getDetailItems.brand,
      category: getDetailItems.category,
    });
  }
}
