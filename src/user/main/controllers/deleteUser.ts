// Models
import { UserDb } from "../../../shared/main/dbModels";
// Interfaces
import { Request, Response } from "express";

export const deleteUser = async ( req: Request, res: Response ) => {
    try {
        const { deleteId } = req.params;
        const userDb = await UserDb.findByIdAndUpdate( deleteId, { status: false } );
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