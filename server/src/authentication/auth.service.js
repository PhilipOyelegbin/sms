const jwt = require("jsonwebtoken")
const staffModel = require("../staffs/staff.model")
const studentModel = require("../students/student.model")
require("dotenv").config()


async function verifyStaff(staffDetails){
  const foundStaff = await staffModel.findOne({email: staffDetails.email}).select("+password")
  if(!(foundStaff && (await foundStaff.comparePwd(staffDetails.password, foundStaff.password)))) {
    return false
  } else {
    return createJWT(foundStaff)
  }
}

async function verifyStudent(studentDetails){
  const foundStudent = await studentModel.findOne({email: studentDetails.email}).select("+password")
  if(!(foundStudent && (await foundStudent.comparePwd(studentDetails.password, foundStudent.password)))) {
    return false
  } else {
    return createJWT(foundStudent)
  }
}

function createJWT(foundData) {
  const payload = {
    id: foundData._id,
    role: foundData.role,
    email: foundData.email,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.LOGIN_EXP),
  })
  return token;
}


module.exports = {
  verifyStaff,
  verifyStudent
}