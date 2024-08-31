import transporter from "../config/transport";

interface Email {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: Email) => {
    await transporter.sendMail({
      from: "Uptask <admin@task.com>",
      to: user.email,
      subject: "Uptask - Confirma tu cuenta",
      text: "Uptask confirma tu cuenta",
      html: `<p>Hola: ${user.name}, has creado tu cuenta en Uptask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>  
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account" target="_blank" >Confirmar Cuenta</a>
      <p>E ingresa el código: <strong>${user.token}</strong> </p>
      <p>Este token expira en 10 minutos</p>
      `,
    });

    console.log("Mensaje enviado");
  };
  static sendPasswordResetToken = async (user: Email) => {
    await transporter.sendMail({
      from: "Uptask <admin@task.com>",
      to: user.email,
      subject: "Uptask - Restablece tu Contraseña",
      text: "Restablece tu contraseña",
      html: `<p>Hola: ${user.name}, has solicitado restablecer tu contraseña </p>  
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password" target="_blank" >Restablecer contraseña</a>
      <p>E ingresa el código: <strong>${user.token}</strong> </p>
      <p>Este token expira en 10 minutos</p>
      `,
    });

    console.log("Mensaje enviado");
  };
}
