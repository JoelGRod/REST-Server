import { isValidObjectId } from "mongoose";
import { UserDb } from "../../../shared/main/dbModels";

export class Searchs {
    public constructor() {}

    public async searchUser( searchTerm: string ): Promise<any[]> {

        const isMongoId = isValidObjectId(searchTerm);

        if(isMongoId) {
            const user = await UserDb.findById(searchTerm);
            return user && user.status ? [ user ] : [];
        };

        const regex = new RegExp(searchTerm, "i");
        return await UserDb.find({
            $or: [{ name: regex },{ email: regex }],
            $and: [{status: true}]
        });
    }
}