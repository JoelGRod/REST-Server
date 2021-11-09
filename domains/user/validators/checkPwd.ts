import { compareCrypt } from "../../../infrastructure/helpers/crypt";
import User from "../models/User";

export const equalPasswords = ( password: string, { req }: any ) => {
    if(!req.body.repeatPwd) 
        throw new Error("No confirmation password supplied");
    if( password === req.body.repeatPwd ) return true;
    throw new Error("Passwords not Equals");
}

export const checkDbPwd = async ( password: string, { req }: any ) => {
    const { uid } = req.body;
    const userDb = await User.findById( uid );

    const isValid = compareCrypt( password, userDb.password );

    if( isValid ) return true;
    throw new Error("Passwords doesn`t match");
}
