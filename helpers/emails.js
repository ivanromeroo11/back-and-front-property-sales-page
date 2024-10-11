import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
  });

  const { nombre, email, token } = datos

  //Enviar el email
  await transport.sendMail({
      from : 'bienesraices.com',
      to: email,
      subject: ' Confirma tu cuenta en bienesraices.com',
      text: 'Confirma tu cuenta en bienesraices.com',
      html: ` 
           <p>Hola ${nombre}, confirma tu cuenta en bienesraices.com</p>
           
            <p>Da click en el siguiente enlace:
            <a href =" ${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar cuenta</a></p>

            <p>Si no fuiste tu, ignora este mensaje</p>
      `
    })
}

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
    }
  });

  const { nombre, email, token } = datos

  //Enviar el email
  await transport.sendMail({
      from : 'bienesraices.com',
      to: email,
      subject: 'Restablece tu password en bienesraices.com',
      text: 'Restablece tu password en bienesraices.com',
      html: ` 
           <p>Hola ${nombre}, has solicitado restablecer tu password bienesraices.com</p>
           
            <p>Sigue el siguiente enlace para generar un password nuevo:
            <a href =" ${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restablecer password</a></p>

            <p>Si no fuiste tu, ignora este mensaje</p>
      `
    })

}
export {
    emailRegistro,
    emailOlvidePassword
}