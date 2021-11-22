import { UserDB } from "./";
import { dbClient } from "./dbConnections";

export const createModel = (type: string) => {
    if(type === "user") return new UserDB(dbClient);
}