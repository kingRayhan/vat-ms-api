import { model, Schema } from "mongoose";

export const Product = model(
  "Product",
  new Schema(
    {
      name: String,
      hsCode: String,
      price: Number,
      vat: Number,
      quantity: Number,
      location: String,
      create_at: String,
    },
    { timestamps: true }
  )
);

export default Product;
