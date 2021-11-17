import { UserDb } from "../../../shared/dbModels";

export const checkId = async ( uid: string ) => {
    const userDb = await UserDb.findById( uid );
    if(userDb && userDb.status) return true;
    throw new Error("The provided id does not exist");
}
