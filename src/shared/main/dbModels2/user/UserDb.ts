import { 
    ObjectId, 
    Document, 
    MongoClient 
} from "mongodb";

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
}
