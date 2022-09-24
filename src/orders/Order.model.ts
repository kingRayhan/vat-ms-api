import { model, Schema } from "mongoose";

export const Order = model(
  "Order",
  new Schema(
    {
      name: String,
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
    { timestamps: true }
  )
);

export default Order;
