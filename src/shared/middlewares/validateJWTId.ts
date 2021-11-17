// Interfaces
import { NextFunction, Request, Response } from "express";
// Modules
import { UserDb } from "../dbModels";

export const validateJWTId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.body;
  const userDb = await UserDb.findById(uid);
  if (!userDb || !userDb.status)
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token ID",
    });

  req.body.loggedUser = userDb;
  next();
};