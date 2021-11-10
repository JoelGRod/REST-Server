// Model
import User from "../models/User";

export const emailExists = async ( email: string ) => {
    const emailExists = await User.findOne({ email });
    if( emailExists ) throw new Error("Email Exists");
}
