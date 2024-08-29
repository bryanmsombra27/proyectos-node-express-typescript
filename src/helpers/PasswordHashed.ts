import bcrypt from "bcrypt";

export const passwordHashed = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    console.log(error);
    throw new Error("No fue posible encriptar la contraseña ");
  }
};

export const passwordVerify = async (
  enterPassword: string,
  userPassword: string
) => {
  try {
    const verify = await bcrypt.compare(enterPassword, userPassword);

    return verify;
  } catch (error) {
    console.log(error);
    throw new Error("Error en las contraseñas");
  }
};
