// borrar categoria - cambiar status a false

// Models
import { Categories } from "../models/Categories";
// Interfaces
import { Request, Response } from "express";

export const deleteCategory = async (req: Request, res: Response) => {
  try {

    return res.status(201).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};