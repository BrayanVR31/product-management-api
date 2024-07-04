import { Router } from "express";
import { ProductController } from "../controllers";
import { upload, destroyRecord, removeFilesOnDestroy } from "../middlewares";
import { serverError as errors } from "../errors";

const router = Router();
const prefix = "/products";

router.get(prefix, ProductController.home);
router.post(prefix, upload.array("images", 2), ProductController.create);
router.get(`${prefix}/:id`, ProductController.edit);
router.patch(`${prefix}/:id`, ProductController.update);
router.delete(`${prefix}/:id`, removeFilesOnDestroy, ProductController.destroy);
// handling errors
//router.use(destroyRecord);
//router.use(errors.serverError);

export default router;
