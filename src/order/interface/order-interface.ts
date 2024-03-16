import { ItemsInterface } from 'src/items/intefaces/item-interface';

export interface OrderInterface {
  product?: ItemsInterface;
  qty: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
