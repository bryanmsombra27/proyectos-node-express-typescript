import mongoose from "mongoose";
import "dotenv/config";
import process from "node:process";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS);
    console.log("CONEXION A LA BASE DE DATOS EXITOSA");
  } catch (error) {
    console.log(error, "ERROR EN LA CONEXION DE DB");
    process.exit(1);
  }
};

export default dbConnection;
