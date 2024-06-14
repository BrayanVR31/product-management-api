import { Request, Response } from "express";
import { Category } from "../models";

interface Body {
  name: string;
}

interface Params {
  id: string;
}

const home = async (request: Request, response: Response) => {
  const data = await Category.find();
  return response.json(data);
};

const create = async (request: Request<{}, {}, Body>, response: Response) => {
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
    return response.status(500).json(error);
  }
};

const edit = async (request: Request<Params, {}, Body>, response: Response) => {
  const {
    params: { id },
  } = request;
  const category = await Category.findById(id);
  return response.json(category);
};

const update = async (
  request: Request<Params, {}, Body>,
  response: Response
) => {
  const {
    body,
    params: { id },
  } = request;
  const category = await Category.findById(id);
  category!.name = body.name;
  await category?.save();
  return response.json({
    message: "Data was updated",
    data: category,
  });
};

const destroy = async (request: Request<Params>, response: Response) => {
  const {
    params: { id: _id },
  } = request;
  await Category.deleteOne({ _id });
  return response.status(204).end();
};

export { home, create, edit, update, destroy };
