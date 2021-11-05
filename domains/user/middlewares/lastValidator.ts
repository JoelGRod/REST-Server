import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const lastValidator = ( req: Request, res: Response, next: NextFunction ) => {
    const errors = validationResult( req );
    
    if( errors.isEmpty() ) return next();
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    });
}

export default lastValidator;