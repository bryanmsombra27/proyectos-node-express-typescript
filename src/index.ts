import { json, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import app from "./server";
import morgan from "morgan";
import dbConnection from "./config/db";
import projectRoutes from "./routes/router";
import authRoutes from "./routes/auth";

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

dbConnection();
app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto:  ${process.env.PORT}`);
});
