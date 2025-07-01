import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            "any.required": "Title is required",
            "string.empty": "Title cannot be empty",
            "string.min": "Title must be at least 3 characters long",
            "string.max": "Title must not exceed 50 characters",
            "string.base": "Title must be a string",
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
    });

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        //next()
        res.status(StatusCodes.CREATED).json({
            message: "Board created successfully",
        });
    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: new Error(error).message,
        });
    }
};

export const boardValidation = {
    createNew,
};
