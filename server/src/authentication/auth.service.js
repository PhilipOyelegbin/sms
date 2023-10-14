const jwt = require("jsonwebtoken")
const userModel = require("../users/user.model")
const studentModel = require("../students/student.model")
require("dotenv").config()


async function verifyUser(userDetails){
  const foundUser = await userModel.findOne({email: userDetails.email}).select("+password")
  if(!(foundUser && (await foundUser.comparePwd(userDetails.password, foundUser.password)))) {
    return false
  } else {
    return createJWT(foundUser)
  }
}

async function verifyStudent(userDetails){
  const foundStudent = await studentModel.findOne({email: userDetails.email}).select("+password")
  if(!(foundStudent && (await foundStudent.comparePwd(userDetails.password, foundStudent.password)))) {
    return false
  } else {
    return createJWT(foundStudent)
  }
}

function createJWT(foundData) {
  const payload = {
    role: foundData.role,
    email: foundData.email,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.LOGIN_EXP),
  })
  return token;
}


module.exports = {
  verifyUser,
  verifyStudent
}