// External
import { OAuth2Client } from "google-auth-library";
// Interfaces
import { NextFunction, Request, Response } from "express";
import { GoogleToken } from "../interfaces/googleToken-interface";
// Models
import User from "../../user/models/User";

export const checkGoogleToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_ID);

    const google_token = <string>req.header("google-token");

    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: process.env.GOOGLE_ID,
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const { email, name, picture } = <GoogleToken>ticket.getPayload();

    req.body.googleUser = { email, name, picture };
    next();
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Google Token",
    });
  }
};

export const checkGoogleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, picture: img } = req.body.googleUser;

    let userDb = await User.findOne({ email });

    if( !userDb ) {
      userDb = new User({
        name,
        email,
        password: ":b",
        img,
        role: "USER_ROLE",
        google: true
      });
      await userDb.save();
    }

    if( !userDb.status ) return res.status(401).json({
      ok: false,
      msg: "Please, contact the administrator"
    });

    req.body.userDb = userDb;
    next();
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Google Token",
    });
  }
};
