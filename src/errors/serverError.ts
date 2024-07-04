import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ServerErrors } from "../interfaces";

// Middleware for handling a different server errors from 'ServerErrors Int'
export const serverError = (
  error: ServerErrors.HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  mongoose.set("bufferTimeoutMS", 120);
  switch (error.type) {
    case ServerErrors.TypeHttpErrors.FAILED_DB_CONNECTION:
      return response.status(error.status || 500).json({ error: error.type });
    case ServerErrors.TypeHttpErrors.FAILED_DB_CASTING_DATA_TYPE:
      return response
        .status(error.status || 500)
        .json({ error: error.message || error.type });
    case ServerErrors.TypeHttpErrors.RESOURCE_NOT_FOUND:
      return response
        .status(error.status || 404)
        .json({ error: error.message || error.type });
    default:
      return response
        .status(error.status || 500)
        .json({ error: ServerErrors.TypeHttpErrors.SERVER_ERROR });
  }
};
