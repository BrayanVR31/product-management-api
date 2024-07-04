import { Request, Response, Express, NextFunction } from "express";
import mongoose, { MongooseError, Error as MongoError } from "mongoose";
import fs from "fs";
import path from "path";
import { Product, Image } from "../models";
import { ProductModel as Body } from "../interfaces";
import { ServerErrors } from "../interfaces";

interface Params {
  id: string;
}

interface ServerError extends Error {
  status?: number;
}

// Get all products
const home = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  mongoose.set("bufferTimeoutMS", 100);
  try {
    const data = await Product.find();
    console.log("error", data);
    // .populate("images", {
    //   createdAt: 0,
    //   __v: 0,
    // })
    // .populate("categories", { __v: 0 });
    return response.json(data);
  } catch (error) {
    const serverError: ServerError = new Error();
    if (error instanceof MongooseError) {
      serverError.message =
        "Failed when it was trying to connect with database";
      serverError.status = 500;
      return next(serverError);
    }
    serverError.status = 500;
    serverError.message = "Server error operation";
    return next(serverError);
  }
};

// Insert a new product
const create = async (request: Request<{}, {}, Body>, response: Response) => {
  const uploadedImages = await Image.insertMany(request.files);
  let uploadedIdImages = [];
  for (const image of uploadedImages) {
    uploadedIdImages.push(image._id);
  }

  const { body } = request;
  const data = new Product();
  data.name = body.name;
  data.images = uploadedIdImages;
  data.categories = JSON.parse(body.categories as string);
  await data.save();
  return response.status(201).json({
    message: "Data was created successfully",
    data,
  });
};

// Get a specific product
const edit = async (
  request: Request<Params, {}, Body>,
  response: Response,
  next: NextFunction
) => {
  mongoose.set("bufferTimeoutMS", 200);
  const serverError: ServerError = new Error();
  try {
    const {
      params: { id },
    } = request;
    const data = await Product.findById(id)
      .populate("categories", {
        createdAt: 0,
      })
      .populate("images");
    if (!data) {
      serverError.status = 404;
      serverError.message = "Product was not found it";
      return next(serverError);
    }
    return response.json({
      message: "Product was found",
      data,
    });
  } catch (error) {
    if (error instanceof MongoError.CastError) {
      serverError.status = 500;
      serverError.message =
        "Error while it trying to cast ObjectId(id invalid format)";
      return next(serverError);
    }
    if (error instanceof MongooseError) {
      serverError.status = 500;
      serverError.message = "Error while it trying to connect with database";
      return next(serverError);
    }
    serverError.status = 500;
    serverError.message = "Server error operation";
    return next(serverError);
  }
};

// Update a specific product
const update = async (
  request: Request<Params, {}, Body>,
  response: Response,
  next: NextFunction
) => {
  const serverError: ServerError = new Error();
  const {
    params: { id },
    body,
  } = request;
  const data = await Product.findByIdAndUpdate(id, { ...body });
  if (!data) {
    serverError.status = 404;
    serverError.message = "Product was not found it";
    return next(serverError);
  }
  return response.json({
    message: "Product was updated",
    data,
  });
};

// Destroy a specific product
const destroy = async (
  error: ServerErrors.HttpError,
  request: Request<Params>,
  response: Response,
  next: NextFunction
) => {
  const {
    params: { id: _id },
  } = request;
  try {
    const product = await Product.deleteOne({ _id });
    console.log(error.message, error.status);
    if (product.deletedCount === 0) {
      const responseError = new Error(
        "The product doesn't exist in the collection"
      ) as ServerErrors.HttpError;
      responseError.status = 404;
      next(responseError);
    }
    return response.status(204).end();
  } catch (error) {
    if (error instanceof MongoError.CastError) {
      const responseError = new Error(error.message) as ServerErrors.HttpError;
      responseError.status = 400;
      next(responseError);
    }
  }
};

export { home, create, edit, update, destroy };
