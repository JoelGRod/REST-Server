import { NextFunction, Request, Response } from "express";
import { Searchs } from "../models";

export const checkProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const searchs = new Searchs();
  const product = await searchs.getProductById(id);
  if (!product || !product.status)
    return res.status(404).json({
      ok: false,
      msg: "The Product does not Exist or it`s Deleted",
    });

  req.body.productDb = product;
  next();
};