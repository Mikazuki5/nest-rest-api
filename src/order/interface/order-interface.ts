export interface OrderInterface {
  productId: string;
  qty: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
