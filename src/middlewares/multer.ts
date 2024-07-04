import { Request, Response, NextFunction } from "express";
import multer, { diskStorage } from "multer";
import { rmdir } from "fs/promises";
import fs from "fs";
import { Model } from "mongoose";
import { join } from "path";
import { getImagesByProductId } from "../helpers";
import { ServerErrors } from "../interfaces";

interface Params {
  id: string;
}

interface RemoveFilesOnDestroyModel {
  populatePath: string;
  fileField: string;
}

// destination path ( images, videos, etc)
const destinationPath = join(process.cwd(), "public", "assets", "images");

// disk configuration
const storage = diskStorage({
  destination: (request, file, callback) => {
    callback(null, destinationPath);
  },
  filename: (request, file, callback) => {
    const prefix = Date.now().toString() + "__upload__";
    callback(null, prefix + file.originalname);
  },
});

interface DeletedFile {
  completed: 0 | 1;
  filename: string;
}

// deleting all files related with products before delete them
export const removeFilesOnDestroy = async (
  request: Request<Params>,
  response: Response,
  next: NextFunction
) => {
  // 0 => It is an error  & 1 => It represent an success
  let deletedImages: DeletedFile[] = [];
  const images = await getImagesByProductId(request.params.id);
  console.log("images-...", images);
  if (!images) {
    const error = new Error(
      "The resource doesn't contains any files"
    ) as ServerErrors.HttpError;
    error.status = 404;
    next(new Error("The resource doesn't contains any files"));
    return;
  }

  images.map(({ filename }) => {
    const imagePath = join(destinationPath, filename);
    if (fs.existsSync(imagePath)) {
      fs.rm(imagePath, (error) => {
        if (error) {
          deletedImages.push({ completed: 0, filename: imagePath });
        } else {
          deletedImages.push({ completed: 1, filename: imagePath });
        }
      });
    }
  });
  if (images.length === 0) {
  }
  next(deletedImages);
};

const upload = multer({
  storage,
});

export default upload;
