// Models
import { Categories } from "../models/Categories";
// Interfaces
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const name = req.body.name.toUpperCase();
    const uid = req.body.uid;

    const categories = new Categories();
    await categories.categoriesDb();

    if (categories.categoryExists(name))
      return res.status(400).json({
        ok: false,
        msg: `Category ${name} already exists`,
      });

    const categoryDb = await categories.saveCategory(name, uid);

    return res.status(201).json({
      ok: true,
      categoryDb,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};
