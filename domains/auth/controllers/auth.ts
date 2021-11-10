import { generateJWT } from '../helpers';
// Interfaces
import { Request, Response } from "express";

export const login = async ( req: Request, res: Response ) => {
    try {
        const userDb = req.body.userDb;

        const jwt = await generateJWT(userDb.id);

        return res.status(200).json({
            ok: true,
            jwt,
            userDb
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the Administrator",
        })
    }

}
