import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { User } from "../models";
import { encryptPass, handleError } from "../helpers";
import { userValidation } from "../validations";
import { ServerErrors } from "../interfaces";

// request listener (function type signature)
type Middleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined | void>;

export const existsEmailAndUser: Middleware = async (
  request,
  response,
  next
) => {
  try {
    const { email, userName } = request.body;
    const query = await User.findOne({
      $or: [
        {
          email,
        },
        { userName },
      ],
    });
    if (!query) return next();
    return response
      .status(400)
      .json({ error: "Email or user name has been registered before" });
  } catch (error) {}
};

export const hasUser: Middleware = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    const data = await userValidation.loginSchema.validateAsync({
      ...request.body,
    });

    if (!user) {
      return response
        .status(404)
        .json({ error: "Email is not registered in the system" });
    }

    const checkedPassword = await encryptPass.verifyPassword(
      password,
      user.password as string
    );

    if (!checkedPassword)
      return response.status(401).json({ error: "Password is invalid" });

    return next();
  } catch (error) {
    if (error instanceof ValidationError)
      return next(
        handleError({
          message: error.message,
          type: ServerErrors.TypeHttpErrors.VALIDATION_ERROR,
        } as ServerErrors.HttpError)
      );
  }
};
