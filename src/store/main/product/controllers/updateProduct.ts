// Models
import { Products } from "../models/Products";
// Interfaces
import { Request, Response } from "express";

export const updateProduct = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    let { name } = req.body;
    const { 
      uid: user,
      price, 
      description, 
      available, 
      category
    } = req.body;
    
    if( name ) name = name.toUpperCase();

    const products = new Products();
    const productDb  = await products.updateProduct( 
      id, { user, name, price, description, available, category } 
    );

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