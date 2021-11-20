import { compareCrypt } from "../../../shared/main/helpers/crypt";

export const equalPasswords = ( password: string, { req }: any ) => {
    if( password === req.body.repeatPwd ) return true;
    throw new Error("Passwords not Equals");
}

export const checkDbPwd = async ( password: string, { req }: any ) => {
    const { loggedUser } = req.body;

    const isValid = compareCrypt( password, loggedUser.password );

    if( isValid ) return true;
    throw new Error("Passwords doesn`t match");
}
