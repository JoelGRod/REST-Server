import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import User from "../../user/models/User";

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  
  next();
};

export default checkUser;