import { Router } from "express";
import category from "./Category";
import product from "./Product";

const api = Router();
const apiPrefix = "/api";

api.use(apiPrefix, [category, product]);

export { api };
