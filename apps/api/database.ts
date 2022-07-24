import {MongoClient} from "mongo/mod.ts";
import {CONFIG} from "./config.ts";

const client = new MongoClient();

await client.connect(CONFIG.MONGO_URL);
console.log("Connected to the database successfully!");

export { client as DBClient };
