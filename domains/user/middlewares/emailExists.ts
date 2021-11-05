// Model
import User from "../models/User";

const emailExists = async ( email: string ) => {
    const emailExists = await User.findOne({ email });
    if( emailExists ) throw new Error("Email Exists");
}

export default emailExists;