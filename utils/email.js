// utils/email.js

const nodemailer = require("nodemailer");

// Configure Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.fair@gmail.com', // Replace with your Gmail address
    pass: 'umjiicrunyvuinld', // Replace with your Gmail password or app password
  },
});

async function sendVerificationEmail(email, url) {
  try {
    await transporter.sendMail({
      from: '"Your App Name" <noreply.fair@gmail.com>', // Replace with your app name and Gmail address
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

module.exports = { sendVerificationEmail };
