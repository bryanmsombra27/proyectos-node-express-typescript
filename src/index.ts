import { json, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import app from "./server";
import db from "./config/db";
import ProductRoutes from "./routes/ProductRouter";

// CONFIG DOCS
import swaggerSpec from "./config/swagger";
import swaggerUI from "swagger-ui-express";

const conectarDB = async () => {
  try {
    await db.authenticate();
    db.sync({
      // alter: true,
    });

    console.log("conexion con la db exitosa");
  } catch (error) {
    console.log(error);
    console.log("ERROR AL CONECTAR LA DB");
    process.exit(1);
  }
};

conectarDB();
app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);
app.use("/api/products", ProductRoutes);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get("/api", (req, res) => {
  return res.send({
    msg: "desde api",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto:  ${process.env.PORT}`);
});
