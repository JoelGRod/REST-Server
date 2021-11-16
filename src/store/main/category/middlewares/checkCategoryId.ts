import { NextFunction, Request, Response } from "express";
import { Searchs } from "../models";

export const checkCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const searchs = new Searchs();
  const category = await searchs.getCategoryById(id);
  if (!category || !category.status)
    return res.status(404).json({
      ok: false,
      msg: "The Category does not Exist or it`s Deleted",
    });

  req.body.categoryDb = category;
  next();
};