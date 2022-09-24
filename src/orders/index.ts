import { Request, Response, Router } from "express";
import Validator from "validatorjs";
import Product from "../products/Product.model";
import Order from "./Order.model";
import { index, show } from "quick-crud";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const data = await index({
    model: Order,
    paginationOptions: {
      page,
      limit,
    },
    populateOptions: "product",
  });

  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  let validation = new Validator(req.body, {
    product: "required",
  });

  const product = await Product.findOne({ product: req.body.product });

  if (!product) {
    return res.status(400).json({
      message: "Product not found with given id",
    });
  }

  if (validation.fails()) {
    return res.status(400).json({
      errors: validation.errors.all(),
    });
  }

  const order = new Order(req.body);

  await order.save();

  return res.json({
    message: "Order placed successfully",
    order,
  });
});

export default router;
