import User from "../../../shared/dbModels/User";

export const checkId = async ( uid: string ) => {
    const userDb = await User.findById( uid );
    if(userDb && userDb.status) return true;
    throw new Error("The provided id does not exist");
}
