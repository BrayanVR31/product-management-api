import { Router } from "express";
import category from "./Category";
import product from "./Product";
import auth from "./auth";

const api = Router();
const apiPrefix = "/api";

api.use(apiPrefix, [auth, category, product]);

export { api };
