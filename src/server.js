import express from "express";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb"; // Import database configuration
import exitHook from "async-exit-hook";
import "dotenv/config"; // Load environment variables from .env file
import { env } from "~/config/environment"; // Import environment variables
const START_SERVER = () => {
    const app = express();

    app.get("/", async (req, res) => {
        res.end("<h1>Hello World!</h1><hr>");
    });

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        // eslint-disable-next-line no-console
        console.log(
            `Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`
        );
    });
    exitHook(() => {
        CLOSE_DB();
    });
};

(async () => {
    try {
        console.log("Connecting to MongoDB...");
        await CONNECT_DB();
        console.log("Connected to MongoDB successfully.");
        START_SERVER();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(0);
    }
})();

// CONNECT_DB()
//     .then(() => console.log("Connect to Mongo"))
//     .then(() => START_SERVER())
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(0);
//     });
