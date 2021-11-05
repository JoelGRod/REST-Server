import { NextFunction, Request, Response } from "express";
// Model
import User from "../models/User";


const emailExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const emailExists = await User.findOne({ email });
    if( emailExists ) return res.status(400).json({
        ok: false,
        msg: "email exists"
    });
    next();
}

export default emailExists;