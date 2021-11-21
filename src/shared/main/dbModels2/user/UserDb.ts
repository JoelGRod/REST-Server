import { ObjectId, Document } from "mongodb";
import { dbClient } from "../dbConnections";

const collection: string = "users";

export class UserModel {
  public uid: ObjectId | null = null;
  public name: string | null = null;
  public email: string | null = null;
  public password: string | null = null;
  public img: string | null = null;
  public role: string | null = null;
  public status: string | null = null;
  public google: string | null = null;

  public constructor(user: Document | null) {
      if(user) {
          this.uid = user._id;
          this.name = user.name;
          this.email = user.email;
          this.password = user.password;
          this.img = user.img;
          this.role = user.role;
          this.status = user.status;
          this.google = user.google;
      }
  }
}

export const findById = async (
  uid: string,
  client = dbClient,
  col = collection
) => {
  const objectId = new ObjectId(uid);
  const user = await client
    .db()
    .collection(col)
    .findOne({ _id: objectId });
  return new UserModel(user);
};
