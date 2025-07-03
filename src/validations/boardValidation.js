import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { BOARD_TYPES } from "~/utils/constants";

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            "any.required": "Title is required",
            "string.empty": "Title cannot be empty",
            "string.min": "Title must be at least 3 characters long",
            "string.max": "Title must not exceed 50 characters",
            "string.base": "Title must be a string",
        }),
        description: Joi.string().required().min(3).max(255).trim().strict(),
        type: Joi.string()
            .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
            .required(),
    });

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessages = new Error(error).message;
        const customError = new ApiError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            errorMessages
        );
        next(customError);
    }
};

export const boardValidation = {
    createNew,
};
