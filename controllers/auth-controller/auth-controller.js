const bcrypt = require("bcryptjs");
const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail, sendResetPasswordEmail } = require("../../utils/email");
const jwt = require("jsonwebtoken");
const path = require('path');

module.exports.register = tryCatch(async (req, res, next) => {
  const { username, password, confirmPassword, email, phone_number } = req.body;

  if (!(username && password && confirmPassword && email && phone_number)) {
    throw customError("Please fill all inputs", 400);
  }

  if (password !== confirmPassword) {
    throw customError("Password & confirm Password not match", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  const newUser = {
    username,
    password: hashedPassword,
    email,
    phone_number,
    verificationToken,
    verified: false,
  };

  await prisma.user.create({ data: newUser });

  const verificationUrl = `http://localhost:8080/auth/verify-email?token=${verificationToken}`;
  await sendVerificationEmail(email, verificationUrl);

  res.status(201).json({ msg: "Register Successfully. Please check your email to verify your account." });
});

module.exports.verifyEmail = tryCatch(async (req, res, next) => {
  const { token } = req.query;

  const user = await prisma.user.findUnique({ where: { verificationToken: token } });

  if (!user) {
    throw customError("Invalid or expired verification token", 400);
  }

  await prisma.user.update({
    where: { username: user.username },
    data: { verified: true, verificationToken: null }
  });

  res.status(200).sendFile(path.join(__dirname, '../../verified.html'));
});



module.exports.login = tryCatch (async (req, res, next) =>{

  const { username, password } = req.body;
  
  if (!(username && password )) {
      throw(customError("Please fill all inputs", 400));
    }
  
  const rs = await prisma.user.findUnique({ where : {username : username}})
  
  if(!rs) {
    throw(customError('invalid login', 401))
  }

  if (!rs.verified) {
    throw customError("Account not verified", 401);
  }

  let passworValid = await bcrypt.compare (password, rs.password)
  if(!passworValid) {
    throw(customError('invalid login', 401))
  }

  const payload = {user_id : rs.user_id, username :rs.username}
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'})


  res.json(token)
})


module.exports.getMe = (req,res,next) => {
  res.json({user : req.user})
}







module.exports.forgotPassword = tryCatch(async (req, res, next) => {
  const { username, email } = req.body;

  if (!(username && email)) {
    throw customError("Please provide both username and email", 400);
  }

  const user = await prisma.user.findUnique({ where: { username, email } });

  if (!user) {
    throw customError("User not found", 404);
  }

  const resetToken = uuidv4();
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  await prisma.user.update({
    where: { user_id: user.user_id },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: new Date(Date.now() + 3600000) // 1 hour expiry
    }
  });

  await sendResetPasswordEmail(user.email, resetUrl);

  res.status(200).json({ msg: "Password reset email sent. Please check your email." });
});


module.exports.resetPassword = tryCatch(async (req, res, next) => {
  const { token, newPassword, confirmNewPassword } = req.body;

  if (!(token && newPassword && confirmNewPassword)) {
    throw customError("Please provide all required fields", 400);
  }

  if (newPassword !== confirmNewPassword) {
    throw customError("Passwords do not match", 400);
  }

  const user = await prisma.user.findUnique({
    where: { resetPasswordToken: token, resetPasswordExpires: { gt: new Date() } }
  });

  if (!user) {
    throw customError("Invalid or expired token", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { user_id: user.user_id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    }
  });

  res.status(200).json({ msg: "Password has been reset successfully" });
});
