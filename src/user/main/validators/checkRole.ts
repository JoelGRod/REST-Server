// Models
import { RoleDb } from "../../../shared/main/dbModels";

export const checkDbRole = async ( role: string ) => {
    const validRole = await RoleDb.findOne({ role });
    if( validRole ) return true;
    throw new Error("Invalid Role");
}

export const checkAdminRole = ( role: string, { req }: any) => {
    const { loggedUser } = req.body;

    if( loggedUser.role === "ADMIN_ROLE" ) return true;
    throw new Error("You need to be ADMIN to execute this action");
}