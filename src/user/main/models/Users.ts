import { UserDb } from "../../../shared/main/dbModels";

export class Users {
  public constructor() {}

  public async getAllUsers(from: any, limit: any): Promise<any> {
    const [total, usersDb] = await Promise.all([
      UserDb.count({ status: true }),
      UserDb.find({ status: true })
        .select("-__v")
        .limit(Number(limit))
        .skip(Number(from)),
    ]);
    return { total, usersDb };
  }
}
