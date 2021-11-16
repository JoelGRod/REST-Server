// Models
import { Searchs, Users } from "../models";
// Interfaces
import { Request, Response } from "express";

export const getUsers = async ( req: Request, res: Response ) => {
    try {
        const { limit, from } = req.query;

        const users = new Users();
        const { total, usersDb } = await users.getAllUsers(from, limit);

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

export const searchUser = async ( req: Request, res: Response ) => {
    try {
        const { searchTerm } = req.params;

        const searchs = new Searchs();
        const results = await searchs.searchUser(searchTerm);
        
        return res.status(200).json({
            ok: true,
            results
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Please, Contact the Administrator"
        }); 
    }
}

