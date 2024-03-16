import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsString()
  status: string;
}
