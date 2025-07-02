import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
const createNew = async (req, res, next) => {
    try {
        // throw new ApiError(
        //     StatusCodes.BAD_GATEWAY,
        //     "This is a test error from the boardController"
        // );
        res.status(StatusCodes.CREATED).json({
            message: "POST from controller: API create new board",
        });
    } catch (error) {
        next(error);
    }
};
export const boardController = { createNew };
