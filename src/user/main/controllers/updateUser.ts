// Models
import { UserDb } from "../../../shared/dbModels";
// Interfaces
import { Request, Response } from "express";

export const updateInfo = async ( req: Request, res: Response ) => {
    try {
        const { 
            uid, name, img, email, role 
        } = req.body;

        await UserDb.findByIdAndUpdate( 
            uid, { name, img, email, role });
        const userDb = await UserDb.findById( uid );

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

export const updatePassword = async ( req: Request, res: Response ) => {
    try {
        const { uid, password } = req.body;

        await UserDb.findByIdAndUpdate( uid, { password } );

        return res.status(200).json({
            ok: true,
            msg: "Password Updated"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, contact the Administrator"
        });
    }
}
