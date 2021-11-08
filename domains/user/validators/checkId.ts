import User from "../models/User"

export const idExists = async ( id: string ) => {
    const validId = await User.findById( id );
    if(validId) return true;
    throw new Error("The provided id does not exist");
}

export const equalIds = ( deleteId: string, { req }: any ) => {
    const { id } = req.body;
    if( id === deleteId ) return true;
    throw new Error("Don`t delete other users profiles!");
}