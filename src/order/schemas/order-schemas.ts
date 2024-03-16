import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Items } from 'src/items/schemas/items-schema';

import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Items' })
  productId: Items;

  @Prop()
  qty: number;

  @Prop()
  status: string;
}

export const OrderSchemas = SchemaFactory.createForClass(Order);
