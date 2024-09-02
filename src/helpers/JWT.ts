import jwt from "jsonwebtoken";
import Types from "mongoose";

type JWTSingData = {
  id: any;
};

export const generateJWT = (data: JWTSingData) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "180d",
    });

    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Error al generar el token");
  }
};
