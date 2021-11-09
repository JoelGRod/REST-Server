import { NextFunction, Request, Response } from "express";
import { compareCrypt } from "../../../infrastructure/helpers/crypt";
// Models
import User from "../../user/models/User";

const checkUser = async (req: Request, res: Response, next: NextFunction) => {

  const { email, password } = req.body;

  const userDb = await User.findOne( { email } );
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

export default checkUser;