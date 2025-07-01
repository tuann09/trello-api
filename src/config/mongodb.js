import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "~/config/environment"; // Import environment variables
let trelloDatabaseInstance = null;
//Khoi tạo một đối tượng mongoClientInstance kết nối MongoDB
const mongoClientInstance = new MongoClient(env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
//Kết nối đến Database
export const CONNECT_DB = async () => {
    await mongoClientInstance.connect();
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};
export const CLOSE_DB = async () => {
    await mongoClientInstance.close();
};

export const GET_DB = () => {
    if (!trelloDatabaseInstance) {
        throw new Error("Database not initialized. Call CONNECT_DB first.");
    }
    return trelloDatabaseInstance;
};
