// Models
import Role from "../models/Role";
import User from "../models/User";

export const checkDbRole = async ( role: string ) => {
    const validRole = await Role.findOne({ role });
    if( validRole ) return true;
    throw new Error("Invalid Role");
}

export const checkAdminRole = async ( role: string, { req }: any) => {
    const { id } = req.body;
    const userDb = await User.findById( id );

    if( userDb.role === "ADMIN_ROLE" ) return true;
    throw new Error("You need to be an ADMIN to execute this action");
}