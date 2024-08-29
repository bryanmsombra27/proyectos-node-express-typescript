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
      <a href="">Confirmar Cuenta</a>
      <p>E ingresa el código: <strong>${user.token}</strong> </p>
      <p>Este token expira en 10 minutos</p>
      `,
    });

    console.log("Mensaje enviado");
  };
}
