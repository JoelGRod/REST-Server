import { NextFunction, Request, Response } from "express";
import { Products } from "../models/Products";

export const checkProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const products = new Products();
  const product = await products.getProductById(id);
  if (!product || !product.status)
    return res.status(404).json({
      ok: false,
      msg: "The Product does not Exist or it`s Deleted",
    });

  req.body.productDb = product;
  next();
};