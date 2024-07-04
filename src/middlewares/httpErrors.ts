import { Request, Response, NextFunction } from "express";
import { ServerErrors } from "../interfaces";

export const destroyRecord = (
  error: ServerErrors.HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(error.status as number).json({
    error: error.message,
  });
};
