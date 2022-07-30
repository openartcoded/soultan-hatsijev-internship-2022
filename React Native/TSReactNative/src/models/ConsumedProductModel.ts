import Product from "./ProductModel";

export default class ConsumedProduct {
  id?: number;
  mealType: string;
  quantity: number;
  productBarcode: string;
  product?: Product;
  consumedAt: number;

  /**
   *
   */
  constructor(
    quantity: number,
    mealType: string,
    productBarcode: string,
    consumedAt: number,
    id?: number,
    product?: Product
  ) {
    this.id = id;
    this.quantity = quantity;
    this.mealType = mealType;
    this.productBarcode = productBarcode;
    this.consumedAt = consumedAt;
    this.product = product;
  }
}
