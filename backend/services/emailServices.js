import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, verificationToken) => {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: { user: "jamblocc@gmail.com", pass: "Chizaram@5466" },
  // });
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   auth: {
  //     user: "garth.zieme@ethereal.email",
  //     pass: "Np1HBQU3VhnMdEJg8y",
  //     password: "flte slta ylgi vxbq",
  //   },
  // });
  const transporter = nodemailer.createTransport({
    service: "gmail", // Your SMTP service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Optional for some servers
    },
    connectionTimeout: 10000, // 10 seconds timeout
    greetingTimeout: 10000, // Increase greeting timeout
  });

  const BACKEND_URL = process.env.BACKEND_API_URL;

  const verificationLink = `${BACKEND_URL}/verify-email?verificationToken=${verificationToken}`;
  const mailOptions = {
    from: "jamblocc@gmail.com",
    to: email,
    subject: "Verify your email address",
    text: `Please use the following link to verify your email: ${verificationLink}`,
    // text: `Click this link to verify your email:  <a href="${verificationLink}" />`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return;
    }
    console.log("Verification email sent:", info.response);
  });
};

export default sendVerificationEmail;
