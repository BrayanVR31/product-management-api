import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { User } from "../models";
import { ServerErrors } from "../interfaces";

type Middleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<Response<any, Record<string, any>> | undefined | void>;

// generate access token when (when user sign up)
export const JWTGenerate: Middleware = async (request, response, next) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });
    const token = jwt.sign(
      { user: user?.id },
      process.env.JWT_SECRET_WORD as string,
      {
        expiresIn: process.env?.JWT_EXPIRATION_TIME || "2h",
      }
    );

    response.status(200).json({
      token,
    });
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error while it was generated access token" });
  }
};

// verify access token in each request (admin routes)
export const JWTVerify: Middleware = async (request, response, next) => {
  try {
    const {
      headers: { authorization: Authorization },
    } = request;
    const token = Authorization?.split(" ").slice(1).pop();

    if (!token) {
      return response.status(401).json({
        error: ServerErrors.TypeHttpErrors.INVALID_ACCESS_TOKEN,
      });
    }

    const decode: jwt.JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_WORD as string
    ) as jwt.JwtPayload;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      return response
        .status(401)
        .json({ error: ServerErrors.TypeHttpErrors.JWT_TOKEN_ERROR });
    return response
      .status(400)
      .json({ error: ServerErrors.TypeHttpErrors.JWT_GENERAL_ERROR });
  }
};
