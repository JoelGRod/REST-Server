// Models
import { Products } from "../models/Products";
// Interfaces
import { Request, Response } from "express";

export const readAllProducts = async (req: Request, res: Response) => {
  try {

    const { from, limit } = req.query;
    
    const products = new Products();
    const productsDb = await products.getAllProducts( from, limit ); 

    return res.status(202).json({
      ok: true,
      productsDb,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};

export const readOneProduct = async (req: Request, res: Response) => {
  try {

    const { productDb } = req.body;

    return res.status(202).json({
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