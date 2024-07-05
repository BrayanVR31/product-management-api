import { Router } from "express";
import { authController } from "../controllers";
import { userMiddleware, authMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/signup",
  userMiddleware.existsEmailAndUser,
  authController.signup,
  authMiddleware.JWTGenerate
);

router.post("/signin", userMiddleware.hasUser, authController.signin);

export default router;
