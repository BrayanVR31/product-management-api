import { Request, Response, Express, NextFunction } from "express";
import mongoose, { Error } from "mongoose";
import fs from "fs";
import path from "path";
import { Product, Image } from "../models";
import { ProductModel as Body } from "../interfaces";
import { HttpErrors } from "../interfaces";

interface Params {
  id: string;
}

// Get all products
const home = async (request: Request, response: Response) => {
  const data = await Product.find()
    .populate("images", {
      createdAt: 0,
      __v: 0,
    })
    .populate("categories", { __v: 0 });
  return response.json(data);
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
const edit = async (request: Request<Params, {}, Body>, response: Response) => {
  const {
    params: { id },
  } = request;
  const data = await Product.findById(id)
    .populate("categories", {
      createdAt: 0,
    })
    .populate("images");
  if (!data) {
    return response.status(404).json({
      message: "Product is not available",
    });
  }
  return response.json({
    message: "Product was found",
    data,
  });
};

// Update a specific product
const update = async (
  request: Request<Params, {}, Body>,
  response: Response
) => {
  const {
    params: { id },
    body,
  } = request;
  const data = await Product.findByIdAndUpdate(id, { ...body });
  if (!data) {
    return response.status(404).json({
      message: "Product was not found",
    });
  }
  return response.json({
    message: "Product was updated",
    data,
  });
};

// Destroy a specific product
const destroy = async (
  error: HttpErrors,
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
      ) as HttpErrors;
      responseError.status = 404;
      next(responseError);
    }
    return response.status(204).end();
  } catch (error) {
    if (error instanceof Error.CastError) {
      const responseError = new Error(error.message) as HttpErrors;
      responseError.status = 400;
      next(responseError);
    }
  }
};

export { home, create, edit, update, destroy };
