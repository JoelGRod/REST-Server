// Models
import User from "../models/User";
// Interfaces
import { Request, Response } from "express";

export const deleteUser = async ( req: Request, res: Response ) => {
    try {
        const { id } = req.body;
        const userDb = await User.findByIdAndUpdate( id, { status: false } );
        return res.status(200).json({
            ok: true,
            userDb
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the Administrator"
        }); 
    }
}