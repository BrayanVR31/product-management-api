import { Request, Response, NextFunction } from "express";
import { HttpErrors } from "../interfaces";

export const destroyRecord = (
  error: HttpErrors,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(error.status).json({
    error: error.message,
  });
};
