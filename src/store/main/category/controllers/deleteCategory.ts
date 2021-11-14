// borrar categoria - cambiar status a false

// Models
import { Categories } from "../models/Categories";
// Interfaces
import { Request, Response } from "express";

export const deleteCategory = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { uid: user } = req.body;

    const categoryDb = await Categories.deleteCategory( id, user );

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