// Models

// Interfaces
import { Request, Response } from "express";
import { saveFile } from "../helpers";

export const createResource = async (req: Request, res: Response) => {
  try {
    if (
      !req.files 
      || Object.keys(req.files).length === 0 
      || !req.files.file) {
      return res.status(400).json({
        ok: false,
        msg: "No files were uploaded."
      });
    };

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
