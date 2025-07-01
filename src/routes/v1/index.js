import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRouter } from "./boardRoute";
const Router = express.Router();
Router.get("/status", (req, res) => {
    res.status(StatusCodes.OK).json({
        status: "OK",
        message: "Board service is running",
    });
});
Router.use("/boards", boardRouter); // Use the board routes under /boards
export const APIs_V1 = Router;
