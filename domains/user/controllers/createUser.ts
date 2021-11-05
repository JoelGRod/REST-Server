// Models
import User from "../models/User";
// Interfaces
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const userDb = new User({name, email, password, role});
        
        await userDb.save();
        return res.status(201).json({
            ok: true,
            msg: "User created",
            userDb
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the administrator",
            error
        })
    }
}
