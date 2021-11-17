// Interfaces
import { Request, Response } from "express";
import { saveFile } from "../helpers";

export const saveImage = async (req: Request, res: Response) => {
  try {
    const msg = await saveFile(req.files, undefined, "imgs");

    return res.status(201).json({
      ok: true,
      msg
    })
    
  } catch (error) {
    return res.status(400).json({
      ok: true,
      error
    })
  }

};
