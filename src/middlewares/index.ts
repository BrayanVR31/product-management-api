import upload, { removeFilesOnDestroy } from "./multer";
import { destroyRecord } from "./httpErrors";
import * as userMiddleware from "./user";

export { upload, destroyRecord, removeFilesOnDestroy, userMiddleware };
