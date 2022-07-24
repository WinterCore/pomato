import {Bson} from "mongo/mod.ts";
import {IOAuthUserData} from "../lib/auth/common.ts";
import {DBClient} from "./init.ts";

export interface IUserSchema extends Omit<IOAuthUserData, "id"> {
    readonly _id: Bson.ObjectId;
}

export const users = DBClient.collection<IUserSchema>("users");
