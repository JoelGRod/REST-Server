// Models
import Role from "../models/Role";

const checkRole = async ( role: string ) => {
    const validRole = await Role.findOne({ role });
    if( validRole ) return true;
    throw new Error("Invalid Role");
}

export default checkRole;