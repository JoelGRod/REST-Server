// Models
import { Categories } from "../models/Categories";
// Interfaces
import { Request, Response } from "express";

export const readAllCategories = async (req: Request, res: Response) => {
  try {

    const { from, limit } = req.query;
    
    const categories = new Categories();
    const categoriesDb = await categories.getAllCategories( from, limit ); 

    return res.status(201).json({
      ok: true,
      categoriesDb,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};

export const readOneCategory = async (req: Request, res: Response) => {
  try {

    const { categoryDb } = req.body;

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