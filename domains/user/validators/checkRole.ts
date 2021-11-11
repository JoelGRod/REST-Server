// Models
import Role from "../models/Role";
import User from "../models/User";

export const checkDbRole = async ( role: string ) => {
    const validRole = await Role.findOne({ role });
    if( validRole ) return true;
    throw new Error("Invalid Role");
}

export const checkAdminRole = async ( role: string, { req }: any) => {
    const { loggedUser } = req.body;

    if( loggedUser.role === "ADMIN_ROLE" ) return true;
    throw new Error("You need to be ADMIN to execute this action");
}