// Models

// Interfaces
import { Request, Response } from "express";

export const createResource = async (req: Request, res: Response) => {
  try {
    return res.status(201).json({
      ok: true,
      msg: "resource uploaded"
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please, Contact the Administrator",
    });
  }
};

