import { NextFunction, Request, Response } from "express";
import { Categories } from "../models/Categories";

export const checkCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const category = await Categories.getCategoryById(id);
  if (!category || !category.status)
    return res.status(404).json({
      ok: false,
      msg: "The Category does not Exist or is Deleted",
    });

  req.body.categoryDb = category;
  next();
};
