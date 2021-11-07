// Models
import User from "../models/User";
// Interfaces
import { Request, Response } from "express";

export const updateInfo = async ( req: Request, res: Response ) => {
    try {
        const { 
            userUpdatedId, 
            name, 
            img, 
            email, 
            role } = req.body;

        await User.findByIdAndUpdate( 
            userUpdatedId, { name, img, email, role });
        const userDb = await User.findById( userUpdatedId );

        return res.status(200).json({
            ok: true,
            userDb
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, contact the administrator"
        });
    }
}

export const updatePassword = async ( req: Request, res: Response ) => {
    try {
        const { id, password } = req.body;

        await User.findByIdAndUpdate( id, { password } );

        return res.status(200).json({
            ok: true,
            msg: "Password Updated"
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, contact the administrator"
        });
        
    }
}

// export const updateEmail = async ( req: Request, res: Response ) => {
//     try {

//         return res.status(200).json({
//             ok: true
//         });
        
//     } catch (error) {
//         return res.status(500).json({
//             ok: false,
// msg: "Please, contact the administrator"
//         });
//     }
// }

// export const updateRole = async ( req: Request, res: Response ) => {
//     try {

//         return res.status(200).json({
//             ok: true
//         });
        
//     } catch (error) {
//         return res.status(500).json({
//             ok: false,
// msg: "Please, contact the administrator"
//         });
//     }
// }
