import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb"; // Import database configuration
import exitHook from "async-exit-hook";
import "dotenv/config"; // Load environment variables from .env file
import { env } from "~/config/environment"; // Import environment variables
import { APIs_V1 } from "~/routes/v1"; // Import API routes
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware"; // Import error handling middleware
const START_SERVER = () => {
    const app = express();
    //Xu lý CORS
    app.use(cors(corsOptions));

    app.use(express.json());

    app.use("/v1", APIs_V1); // Use the API routes

    app.use(errorHandlingMiddleware);
    if (env.BUILD_MODE === "production") {
        app.listen(process.env.PORT, () => {
            // eslint-disable-next-line no-console
            console.log(
                `Production: Hello ${env.AUTHOR}, Back-end Server is running at Port: ${process.env.PORT}`
            );
        });
    } else {
        app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
            // eslint-disable-next-line no-console
            console.log(
                `Hello ${env.AUTHOR}, I am running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`
            );
        });
    }

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
