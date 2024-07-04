import { Router } from "express";
import { CategoryController } from "../controllers";

const router = Router();
const prefix = "/categories";

router.get(prefix, CategoryController.home);
router.post(prefix, CategoryController.create);
router.get(`${prefix}/:id`, CategoryController.edit);
router.patch(`${prefix}/:id`, CategoryController.update);
router.delete(`${prefix}/:id`, CategoryController.destroy);

export default router;
