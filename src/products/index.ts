import { Request, Response, Router } from "express";
import Validator from "validatorjs";
import Product from "./Product.model";
import { index, show } from "quick-crud";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const data = await index({
    model: Product,
    paginationOptions: {
      page,
      limit,
    },
  });

  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const productId = req.params.id;

  const data = await show({
    model: Product,
    where: {
      _id: productId,
    },
  });

  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  let validation = new Validator(req.body, {
    name: "required|min:5",
    hsCode: "required",
    price: "required",
    vat: "required",
    quantity: "required",
    location: "required",
  });

  if (validation.fails()) {
    return res.status(400).json({
      errors: validation.errors.all(),
    });
  }

  const product = await Product.create(req.body);

  res.json({
    message: "create product",
    data: product,
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  let validation = new Validator(req.body, {
    name: "min:5",
    // hsCode: "nullable",
    // price: "nullable",
    // vat: "nullable",
    // quantity: "nullable",
    // location: "nullable",
  });

  if (validation.fails()) {
    return res.status(400).json({
      errors: validation.errors.all(),
    });
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    message: "create product",
    data: product,
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  let validation = new Validator(req.params, {
    id: "required",
  });

  if (validation.fails()) {
    return res.status(400).json({
      errors: validation.errors.all(),
    });
  }

  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.json({
        message: err,
      });
    } else {
      res.json({
        message: "delete product",
        data: "success",
      });
    }
  });

  // res.json({
  //   message: "create product",
  //   data: product,
  // });
});

export default router;
