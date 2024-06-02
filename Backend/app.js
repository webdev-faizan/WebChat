import Express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";
import bodyParser from "body-parser";
import { Cors } from "./config.js";
import Route from "./routes/Route.js";
const app = Express();
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(cors(Cors));
app.use(Express.json({ limit: "40kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/v1", Route);

app.get("/", (req, res) => {
  res.json({ message: "nice" });
});

export default app;
