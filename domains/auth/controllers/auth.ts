// Interfaces
import { Request, Response } from "express";

export const login = async ( req: Request, res: Response ) => {
    try {
        const { email, password } = req.body;

        return res.status(200).json({
            ok: true,
            email,
            password
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the Administrator",
        })
    }

}
