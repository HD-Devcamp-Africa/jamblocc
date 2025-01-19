import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, verificationToken) => {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: { user: "jamblocc@gmail.com", pass: "Chizaram@5466" },
  // });
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "garth.zieme@ethereal.email",
      pass: "Np1HBQU3VhnMdEJg8y",
    },
  });

  const BACKEND_URL = process.env.BACKEND_API_URL;

  const verificationLink = `${BACKEND_URL}/verify-email?verificationToken=${verificationToken}`;
  const mailOptions = {
    from: "jamblocc@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `Click this link to verify your email:  <a href="${verificationLink}" />`,
  };

  return transporter.sendMail(mailOptions);
};

export default sendVerificationEmail;
