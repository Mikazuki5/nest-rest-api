import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemsDocument = HydratedDocument<Items>;

@Schema({ timestamps: true })
export class Items {
  @Prop()
  productName: string;

  @Prop()
  qty: number;

  @Prop()
  productDescription: string;

  @Prop()
  brand: string;

  @Prop()
  category: string;
}

export const ItemsSchemas = SchemaFactory.createForClass(Items);
