import { NextFunction, Request, Response } from "express";
import { encrypt } from "../../../infrastructure/helpers/crypt";

export const encryptPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  req.body.password = encrypt(password);
  next();
};
