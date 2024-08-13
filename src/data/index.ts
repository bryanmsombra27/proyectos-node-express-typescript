import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({
      force: true,
    });
    console.log("DATOS ELIMINADOS CON EXITO");
    exit();
  } catch (error) {
    console.log(error, "ERORR ");
    exit(1);
  }
};

if (process.argv[2] == "--clear" || process.argv[2] == "-c") {
  clearDB();
}
