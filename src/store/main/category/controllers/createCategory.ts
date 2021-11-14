// Models
import { Categories } from "../models/Categories";
// Interfaces
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const name = req.body.name.toUpperCase();
    const user = req.body.uid;

    const categoryDb = await Categories.saveCategory({name, user});

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
