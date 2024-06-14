import { Schema, model } from "mongoose";
import { ProductModel } from "../interfaces";

// product schema definition
const ProductSchema = new Schema<ProductModel>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "category",
  },
  deletedAt: {
    type: Schema.Types.Date,
    default: null,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: null,
  },
  images: {
    type: [Schema.Types.ObjectId],
    ref: "image",
  },
});

// product model definition
const Product = model<ProductModel>("product", ProductSchema);

export { ProductSchema };
export default Product;
