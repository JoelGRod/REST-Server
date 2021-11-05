import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";

const encryptPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  const salt = bcrypt.genSaltSync();
  req.body.password = bcrypt.hashSync(password, salt);
  next();
};

export default encryptPassword;
