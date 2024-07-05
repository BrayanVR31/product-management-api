import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { encryptPass, handleError } from "../helpers";
import { User } from "../models";
import { userValidation } from "../validations";
import { ServerErrors } from "../interfaces";

// request listener (function type signature)
type Controller = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined | void>;

// sign up a new user with token generation access
export const signup: Controller = async (request, response, next) => {
  try {
    const { userName, email, password } = request.body;
    const value = await userValidation.schema.validateAsync({
      ...request.body,
    });

    const user = new User({
      userName,
      email,
      password: await encryptPass.encryptPassword(password),
    });

    await user.save();

    return response.status(201).json(user.toJSON());
  } catch (error) {
    // handling server errors
    if (error instanceof ValidationError)
      return next(
        handleError({
          message: error.message,
          type: ServerErrors.TypeHttpErrors.VALIDATION_ERROR,
        } as ServerErrors.HttpError)
      );

    return next(
      handleError({
        type: ServerErrors.TypeHttpErrors.SERVER_ERROR,
      } as ServerErrors.HttpError)
    );
  }
};

// sign in an existing user (check credentials for generate access token)
export const signin: Controller = async (request, response, next) => {
  try {
    return response.status(200).json({ message: "success login" });
  } catch (error) {
    // handling server errors

    return next(
      handleError({
        type: ServerErrors.TypeHttpErrors.SERVER_ERROR,
      } as ServerErrors.HttpError)
    );
  }
};
