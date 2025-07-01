import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation"; // Import board validation
const Router = express.Router();
Router.route("/")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            message: "Board service is running",
        });
    })
    .post(boardValidation.createNew);
export const boardRouter = Router;
