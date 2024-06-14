import express from "express";
import morgan from "morgan";
import cors from "cors";
import { join } from "path";
import { api } from "./routes";

const app = express();
const port = process.env.EXPRESS_PORT || 8080;
const host = process.env.EXPRESS_HOST || "127.0.0.1";

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/static", express.static(join(process.cwd(), "public", "assets")));

// using routes
app.use(api);

export default app;
export { port, host };
