import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateItemsDTO {
  @IsOptional()
  @IsNotEmpty({ message: "Product name can't be empty" })
  @IsString()
  productName: string;

  @IsOptional()
  @MaxLength(250)
  @IsString()
  productDescription: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category: string;
}
