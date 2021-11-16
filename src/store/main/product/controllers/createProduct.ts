// Models
import { Products } from "../models";
// Interfaces
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const name = req.body.name.toUpperCase();
    const {
      price, 
      description, 
      available, 
      category, 
      uid: user
    } = req.body;

    const products = new Products();
    const productDb = await products.saveProduct({
      name,
      price, 
      description, 
      available, 
      category, 
      user
    });

    return res.status(201).json({
      ok: true,
      productDb,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};
