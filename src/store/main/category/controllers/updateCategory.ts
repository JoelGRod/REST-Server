// Models
import { Categories } from "../models";
// Interfaces
import { Request, Response } from "express";

export const updateCategory = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const { uid: user } = req.body;

    const categories = new Categories();
    const categoryDb  = await categories.updateCategory( 
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