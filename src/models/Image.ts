import { Schema, model } from "mongoose";
import { ImageModel } from "../interfaces";

// image schema definition
const ImageSchema = new Schema<ImageModel>({
  fieldname: {
    type: Schema.Types.String,
    select: false,
  },
  originalname: {
    type: Schema.Types.String,
    select: false,
  },
  encoding: {
    type: Schema.Types.String,
    select: false,
  },
  mimetype: {
    type: Schema.Types.String,
    select: false,
  },
  destination: { type: Schema.Types.String, select: false },
  filename: { type: Schema.Types.String },
  path: { type: Schema.Types.String, select: false },
  size: { type: Schema.Types.Number, select: false },
});

ImageSchema.post("insertMany", (doc) => {
  console.log("insertMany...", doc);
});

// image model definition
const Image = model<ImageModel>("image", ImageSchema);

export { ImageSchema, Image };
