import { ObjectId, Document, MongoClient } from "mongodb";
import { UserData } from "../../interfaces";

export class UserDB {
  private _client: MongoClient;
  private _col: string = "users";

  public constructor(dbClient: MongoClient) {
    this._client = dbClient;
  }

  public findById = async (uid: string): Promise<Document | null> => {
    try {
      const objectId = new ObjectId(uid);
      const user = await this._client
        .db()
        .collection(this._col)
        .findOne({ _id: objectId });
      if (user) {
        const { _id, __v, ...data } = user;
        return { uid: _id, ...data };
      }
      return null;
    } catch (error) {
      throw new Error("Invalid ID");
    }
  };

  public save = async (data: UserData): Promise<Document | null> => {
    if (!data.status) data = { ...data, status: true };
    if (!data.google) data = { ...data, google: false };
    try {
      const response = await this._client
        .db()
        .collection(this._col)
        .insertOne({ ...data });
      return await this.findById(String(response.insertedId));
    } catch (error) {
      throw new Error("Error saving user");
    }
  };

  public findByIdAndUpdate = async (uid: string, data: UserData) => {
    try {
      let user = await this.findById(uid);
      const objectId = new ObjectId(uid);
      // TODO: DELETE UID
      user = { ...user, ...data };
      
      console.log(user);
      const response = await this._client
        .db()
        .collection(this._col)
        .updateOne({ _id: objectId }, { $set: {...user} });
        console.log(response);
    } catch (error) {
      throw new Error("Error updating user");
    }
  };
}
