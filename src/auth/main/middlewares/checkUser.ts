// Interfaces
import { NextFunction, Request, Response } from "express";
// Infrastructure
import { compareCrypt } from "../../../shared/helpers/crypt";
// Models
import { UserDb } from "../../../shared/dbModels";

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {

  const { email, password } = req.body;

  const userDb = await UserDb.findOne( { email } );
  if(!userDb || !userDb.status) return res.status(400).json({
    ok: false,
    msg: "Wrong Credentials"
  });

  const validPassword = compareCrypt( password, userDb.password );
  if(!validPassword) return res.status(400).json({
    ok: false,
    msg: "Wrong Credentials"
  });

  req.body.userDb = userDb;
  next();
};
