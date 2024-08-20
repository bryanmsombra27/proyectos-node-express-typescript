import { json, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import app from "./server";
import morgan from "morgan";
import dbConnection from "./config/db";

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);
dbConnection();
app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto:  ${process.env.PORT}`);
});
