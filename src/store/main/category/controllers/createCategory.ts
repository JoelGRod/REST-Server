// Models
import { Category } from '../models/Category';
// Interfaces
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  try {

    const name = req.body.name.toUpperCase();

    const category = new Category();

    const categoryExists = await category.categoryExists(name);

    if(categoryExists) return res.status(400).json({
        ok: false,
        msg: `Category ${name} already exists`
    });

    const categoryDb = await category.saveCategory({
        name,
        user: req.body.uid
    });

    return res.status(201).json({
      ok: true,
      categoryDb
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};
