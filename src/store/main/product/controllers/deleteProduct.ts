// Models
import { Products } from "../models/Products";
// Interfaces
import { Request, Response } from "express";

export const deleteProduct = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { uid: user } = req.body;

    const products = new Products();
    const productDb = await products.deleteProduct( id, user );

    return res.status(201).json({
      ok: true,
      productDb
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};