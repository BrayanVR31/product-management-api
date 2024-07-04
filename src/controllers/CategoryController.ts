import { Request, Response, NextFunction } from "express";
import { MongooseError, Error } from "mongoose";
import { Category } from "../models";
import { ServerErrors } from "../interfaces";
import { handleError } from "../helpers";

interface Body {
  name: string;
}

interface Params {
  id: string;
}

const home = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const data = await Category.find();
    return response.json(data);
  } catch (error) {
    // handling server errors
    if (error instanceof MongooseError)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CONNECTION,
          status: 500,
        } as ServerErrors.HttpError)
      );

    return next(handleError() as ServerErrors.HttpError);
  }
};

const create = async (
  request: Request<{}, {}, Body>,
  response: Response,
  next: NextFunction
) => {
  const { body } = request;
  try {
    const category = new Category();
    category.name = body.name;
    await category.save();
    return response.status(201).json({
      message: "Data was created successfully",
      data: category,
    });
  } catch (error) {
    // handling server errors
    if (error instanceof MongooseError)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CONNECTION,
          status: 500,
        } as ServerErrors.HttpError)
      );

    return next(handleError() as ServerErrors.HttpError);
  }
};

const edit = async (
  request: Request<Params, {}, Body>,
  response: Response,
  next: NextFunction
) => {
  const {
    params: { id },
  } = request;
  try {
    const category = await Category.findById(id);
    if (!category)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.RESOURCE_NOT_FOUND,
          status: 404,
        } as ServerErrors.HttpError)
      );
    return response.json(category);
  } catch (error) {
    // handling server errors
    if (error instanceof Error.CastError)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CASTING_DATA_TYPE,
          status: 500,
        } as ServerErrors.HttpError)
      );

    if (error instanceof MongooseError)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CONNECTION,
          status: 500,
        } as ServerErrors.HttpError)
      );

    return next(handleError() as ServerErrors.HttpError);
  }
};

const update = async (
  request: Request<Params, {}, Body>,
  response: Response,
  next: NextFunction
) => {
  const {
    body,
    params: { id },
  } = request;
  try {
    const category = await Category.findById(id);
    category!.name = body.name;
    await category?.save();
    return response.json({
      message: "Data was updated",
      data: category,
    });
  } catch (error) {
    // handling server errors
    if (error instanceof Error.CastError)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CASTING_DATA_TYPE,
          status: 500,
        } as ServerErrors.HttpError)
      );

    if (error instanceof MongooseError)
      return next(
        handleError({
          status: 500,
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CONNECTION,
        } as ServerErrors.HttpError)
      );

    return next(handleError());
  }
};

const destroy = async (
  request: Request<Params>,
  response: Response,
  next: NextFunction
) => {
  const {
    params: { id: _id },
  } = request;
  try {
    const deletedCategory = await Category.findOneAndDelete({ _id });
    // handling logic errors
    if (!deletedCategory)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.RESOURCE_NOT_FOUND,
          status: 404,
        } as ServerErrors.HttpError)
      );
    return response.status(204).end();
  } catch (error) {
    // handling server errors
    if (error instanceof Error.CastError)
      return next(
        handleError({
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CASTING_DATA_TYPE,
          status: 500,
        } as ServerErrors.HttpError)
      );

    if (error instanceof MongooseError)
      return next(
        handleError({
          status: 500,
          type: ServerErrors.TypeHttpErrors.FAILED_DB_CONNECTION,
        } as ServerErrors.HttpError)
      );

    return next(handleError());
  }
};

export { home, create, edit, update, destroy };
