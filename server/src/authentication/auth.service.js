const jwt = require("jsonwebtoken")
require("dotenv").config()


function verifyUser({email, password}, foundUser){
  if(foundUser === undefined){
    return false
  }
  else {
    if(email === foundUser.email && password === foundUser.password) {
      return true;
    } else {
      return false
    }
  }
}

function createJWT(foundUser) {
  const payload = {
    role: foundUser.role,
    email: foundUser.email,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.LOGIN_EXP),
  })
  return token;
}


module.exports = {
  verifyUser,
  createJWT
}