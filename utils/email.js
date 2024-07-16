

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.fair@gmail.com', 
    pass: 'umjiicrunyvuinld', 
  },
});

async function sendVerificationEmail(email, url) {
  try {
    await transporter.sendMail({
      from: '"Fair E-commerce" <noreply.fair@gmail.com>', 
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking the following link: ${url}`,
      html: `<a href="${url}">Verify Email</a>`,
    });
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email");
  }
}

async function sendResetPasswordEmail(email, url) {
  try {
    await transporter.sendMail({
      from: '"Fair E-commerce" <noreply.fair@gmail.com>',
      to: email,
      subject: "Password Reset",
      text: `You can reset your password by clicking the following link: ${url}`,
      html: `<a href="${url}">Reset Password</a>`,
    });
    console.log("Reset password email sent to:", email);
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Could not send reset password email");
  }
}

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
