import upload, { removeFilesOnDestroy } from "./multer";
import { destroyRecord } from "./httpErrors";
import * as userMiddleware from "./user";
import * as authMiddleware from "./auth";

export {
  upload,
  destroyRecord,
  removeFilesOnDestroy,
  userMiddleware,
  authMiddleware,
};
