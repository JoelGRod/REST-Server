import { NextFunction, Request, Response } from "express";
import { CategoryDb } from "../dbModels";

export const checkCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const category = await CategoryDb.findById(id).populate({
    path: "user",
    select: "name",
  });
  if (!category || !category.status)
    return res.status(404).json({
      ok: false,
      msg: "The Category does not Exist or is Deleted",
    });

  req.body.categoryDb = category;
  next();
};
