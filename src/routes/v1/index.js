import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "~/routes/v1/boardRoute";
import { columnRoute } from "~/routes/v1/columnRoute";
import { cardRoute } from "~/routes/v1/cardRoute";
const Router = express.Router();
Router.get("/status", (req, res) => {
    res.status(StatusCodes.OK).json({
        status: "OK",
        message: "Board service is running",
    });
});
// Board API
Router.use("/boards", boardRoute);

//Column API
Router.use("/columns", columnRoute);

//Card API
Router.use("/cards", cardRoute);
export const APIs_V1 = Router;
