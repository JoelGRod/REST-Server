// actualizar categoria y que no exista la nueva ya

// Models
import { Categories } from "../models/Categories";
// Interfaces
import { Request, Response } from "express";

export const updateCategory = async (req: Request, res: Response) => {
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