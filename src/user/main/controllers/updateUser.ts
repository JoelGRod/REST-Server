// Models
import { UserDb } from "../../../shared/dbModels";
// Interfaces
import { Request, Response } from "express";
// Services
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

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

export const updateImg = async( req: Request, res: Response ) => {
    try {
        const { uid } = req.body;
        const userDb = await UserDb.findById(uid);

        // Delete last img
        if(userDb.img) {
            const [ img ] = userDb.img.split("/").slice(-1);
            const [ name ] = img.split(".");
            const resp = await cloudinary.uploader.destroy( `REST_SERVER/users/${name}` );
        }

        const { tempFilePath } = <any>req.files!.file;
        const { secure_url } = await cloudinary.uploader.upload( 
            tempFilePath, 
            { resource_type: "image", folder: "REST_SERVER/users" });

        userDb.img = secure_url;
        userDb.save();

        return res.status(200).json({
            ok: true,
            msg: "Img uploaded and Updated",
            link: secure_url
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, contact the Administrator"
        });
    }
}
