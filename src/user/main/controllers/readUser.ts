// Models
import User from "../../../shared/dbModels/User";
// Interfaces
import { Request, Response } from "express";

export const getUsers = async ( req: Request, res: Response ) => {
    try {
        const { limit, from } = req.query;     
        const [ total, usersDb ] = await Promise.all(
            [   
                User.count({ status: true }),
                User.find({ status: true })
                    .limit(Number(limit))
                    .skip(Number(from)) 
            ]);
        return res.status(200).json({
            ok: true,
            total,
            usersDb
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the Administrator"
        }); 
    }
}