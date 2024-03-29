import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateItemsDTO {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsOptional()
  @MaxLength(250)
  @IsString()
  productDescription: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsOptional()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
