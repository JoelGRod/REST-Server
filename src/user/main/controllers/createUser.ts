// Models
import { UserDb } from "../../../shared/main/dbModels";
// Interfaces
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const role = "USER_ROLE";

        const userDb = new UserDb({name, email, password, role});
        
        await userDb.save();
        return res.status(201).json({
            ok: true,
            userDb
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the Administrator",
        })
    }
}
