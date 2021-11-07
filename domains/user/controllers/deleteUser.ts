// Models
import User from "../models/User";
// Interfaces
import { Request, Response } from "express";

export const deleteUser = async ( res: Response, req: Request ) => {
    try {

        return res.status(200).json({});
        
    } catch (error) {

        return res.status(500).json({});
        
    }
}