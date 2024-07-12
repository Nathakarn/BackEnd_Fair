const bcrypt = require("bcryptjs")
const customError = require("../../utils/customError");
const tryCatch = require("../../utils/tryCatch");
const prisma = require("../../models")
const jwt = require("jsonwebtoken")

module.exports.register = tryCatch (async (req, res, next) =>{

    const { username, password, confirmPassword, email, phone_number } = req.body;
    
    if (!(username && password && confirmPassword && email && phone_number)) {
        throw(customError("Please fill all inputs", 400));
      }
    
    if (password !== confirmPassword) {
        throw(customError("Password & confirm Password not match", 400));
      }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser =  { username, password : hashedPassword, email, phone_number }

    await prisma.user.create({data : newUser})
    
    res.status(201).json({ msg: "Register Successfully" });
})

module.exports.login = tryCatch (async (req, res, next) =>{

  const { username, password } = req.body;
  
  if (!(username && password )) {
      throw(customError("Please fill all inputs", 400));
    }
  
  const rs = await prisma.user.findUnique({ where : {username : username}})

  if(!rs) {
    throw(customError('invalid login', 401))
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