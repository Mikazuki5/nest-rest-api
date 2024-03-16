import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { OrderService } from './order.service';
import { OrderInterface } from './interface/order-interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  async getOrder(): Promise<OrderInterface[]> {
    return await this.orderService.getOrder();
  }
  @Post('/createOrder')
  async createOrder(@Body() createOrderDto: CreateOrderDTO) {
    return await this.orderService.createOrder(createOrderDto);
  }
  @Get('/detail/:id')
  async getDetailsOrder(@Param('id') id: string) {
    return this.orderService.getOrderDetail(id);
  }
}
