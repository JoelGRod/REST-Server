import User from "../models/User"

const idExists = async ( id: string ) => {
    const validId = await User.findById( id );
    if(validId) return true;
    throw new Error("The provided id does not exist");
}

export default idExists;