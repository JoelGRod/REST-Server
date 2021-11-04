// Interfaces
import { Request, Response } from "express";
// Models
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if( user ) return res.status(400).json({
            ok: false,
            msg: "User exists"
        });

        
        const userDb = new User(req.body);
        await userDb.save();
        return res.status(201).json({
            ok: true,
            msg: "User created"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the administrator",
            error
        })
    }
}
