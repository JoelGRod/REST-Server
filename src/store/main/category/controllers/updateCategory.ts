// actualizar categoria y que no exista la nueva ya

// Models
import { Categories } from "../models/Categories";
// Interfaces
import { Request, Response } from "express";

export const updateCategory = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const { uid: user } = req.body;

    const categoryDb  = await Categories.updateCategory( 
      id, { user, name } 
    );

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