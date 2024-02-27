export interface ItemsInterface {
  id?: string;
  productName: string;
  productDescription: string;
  qty: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  brand: string;
  category: string;
}
