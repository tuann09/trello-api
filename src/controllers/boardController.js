import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { boardService } from "~/services/boardService";
const createNew = async (req, res, next) => {
    try {
        // throw new ApiError(
        //     StatusCodes.BAD_GATEWAY,
        //     "This is a test error from the boardController"
        // );
        const createdBoard = await boardService.createNew(req.body);
        res.status(StatusCodes.CREATED).json({
            createdBoard,
        });
    } catch (error) {
        next(error);
    }
};
export const boardController = { createNew };
