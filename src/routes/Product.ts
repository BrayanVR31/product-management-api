import { Router } from "express";
import { ProductController } from "../controllers";
import { upload, destroyRecord, removeFilesOnDestroy } from "../middlewares";

const router = Router();
const prefix = "/product";

router.get(prefix, ProductController.home);
router.post(prefix, upload.array("images", 2), ProductController.create);
router.get(`${prefix}/:id`, ProductController.edit);
router.patch(`${prefix}/:id`, ProductController.update);
router.delete(`${prefix}/:id`, removeFilesOnDestroy, ProductController.destroy);
// handling errors
router.use(destroyRecord);

export default router;
