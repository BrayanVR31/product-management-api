import { Types } from "mongoose";
import { ImageModel } from ".";

type ImagesByField = {
  [fieldname: string]: ImageModel[];
};

type ImagesOption = ImageModel[] | ImagesByField | null;

interface ProductModel {
  id: Types.ObjectId;
  name: string;
  images: Types.ObjectId[] | { filename: string }[];
  categories: Types.ObjectId[] | string[] | string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export { ProductModel };
