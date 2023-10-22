const jwt = require("jsonwebtoken")
const staffService = require("../staffs/staff.service")
const studentService = require("../students/student.service")
require("dotenv").config()

//This function verifyToken will verify the token coming from headers
const verifyToken = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) {
      return res.status(401).send({message: "Token is required for authentication"})
    }
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // check if the staff or student still exist on the database after token has been generated
    const staff = await staffService.getOneStaff(decoded.email)
    const student = await studentService.getOneStudent(decoded.email)
    if(!(staff || student)) {
      return res.status(401).send({message: "User with the token does not exist"})
    }
    req.user = (staff || student)
  } catch (error) {
    return res.status(403).send({error: "Invalid token", error})
  }
  return next();
};

// const restrict = (role) => {
//   return (req, res, next) => {
//     if(req?.user.role !== role) {
//       return res.status(403).send({message: "You are not authorized to perform this action"})
//     }
//     next ()
//   }
// }

// This function verify the role to authorize a user based on the users role
const restrict = (...role) => {
  return (req, res, next) => {
    if(!role?.includes(req.user.role)) {
      return res.status(403).send({message: "You are not authorized to perform this action"})
    }
    next ()
  }
}


module.exports = {
  verifyToken,
  restrict
};