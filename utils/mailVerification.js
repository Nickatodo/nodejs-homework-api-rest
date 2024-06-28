const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nicolasjcanalesdiaz@gmail.com",
    pass: process.env.MAIL_SECRET,
  },
});

async function mailVerification(to, text) {
  try {
    await transport.sendMail({
      from: "nicolasjcanalesdiaz@gmail.com",
      to: to,
      subject: "Correo de Verificacion APP Contacts",
      text: text,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { mailVerification };
