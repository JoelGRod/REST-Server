// External
import jwt from "jsonwebtoken";
// Interfaces
import { NextFunction, Request, Response } from "express";
import { JWTDecoded } from "../interfaces/JWT-interface";

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-token");

    if(!token) return res.status(401).json({
        ok: false,
        msg: "No Token Found"
    });

    try {
        const { uid } = <JWTDecoded>jwt.verify(
            token, 
            String(process.env.SECRET)
        );
        req.body.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid Token"
        })
    }
}
