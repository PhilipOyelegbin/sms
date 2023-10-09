const userModel = require("../users/user.model")
const studentModel = require("../students/student.model")
const {verifyUser, createJWT} = require("./auth.service")


const loginUser = async (userDetails) => {
  const foundUser = await userModel.findOne({email: userDetails.email}).select("+password")
  if(!foundUser) {
    return null
  } else {
    const userVerified = verifyUser(userDetails, foundUser)
    if(userVerified === true) {
      return createJWT(foundUser)
    } else {
      return null
    }
  }
}

const loginStudent = async (userDetails) => {
  const foundStudent = await studentModel.findOne({email: userDetails.email}).select("+password")
  if(!foundStudent) {
    return null
  } else {
    const userVerified = verifyUser(userDetails, foundStudent)
    if(userVerified === true) {
      return createJWT(foundStudent)
    } else {
      return null
    }
  }
}


module.exports = {
  loginUser,
  loginStudent
}