import { model, Schema } from "mongoose";

export const Sell = model(
  "Sell",
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

export default Sell;
