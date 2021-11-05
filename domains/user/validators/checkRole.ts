
const checkRole = ( value: string ) => {
    const validRoles = ["ADMIN", "USER"];
    if( validRoles.includes(value) ) return true;
    throw new Error("Invalid Role");
}

export default checkRole;