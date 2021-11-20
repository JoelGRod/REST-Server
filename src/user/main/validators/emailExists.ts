// Model
import { UserDb } from "../../../shared/main/dbModels";

export const emailExists = async ( email: string ) => {
    const emailExists = await UserDb.findOne({ email });
    if( emailExists ) throw new Error("Email Exists");
}
