// Models

// Interfaces
import { Request, Response } from "express";
import { saveFile } from "../helpers";

export const createResource = async (req: Request, res: Response) => {
  try {
    const msg = await saveFile(req.files);

    return res.status(201).json({
      ok: true,
      msg
    })
    
  } catch (error) {
    return res.status(500).json({
      ok: true,
      error
    })
  }

};
