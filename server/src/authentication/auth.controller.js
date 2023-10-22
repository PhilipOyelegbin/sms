const {verifyStaff, verifyStudent} = require("./auth.service")


const loginStaff = async(req, res) => {
  try {
    const {email, password} = req.body
    if(!(email && password)) {
      return res.status(400).send({message: "All fields are required"})
    }
    const staff = await verifyStaff(req.body)
    if(!staff) {
      return res.status(403).send({message: "Staff authentication failed... input the right details"})
    }
    return res.status(200).send({message: "The staff has been authenticated", staff})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const loginStudent = async(req, res) => {
  try {
    const {email, password} = req.body
    if(!(email && password)) {
      return res.status(400).send({message: "All fields are required"})
    }
    const student = await verifyStudent(req.body)
    if(!student) {
      return res.status(403).send({message: "Student authentication failed... input the right details"})
    }
    return res.status(200).send({message: "The student has been authenticated", student})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}


module.exports = {
  loginStaff,
  loginStudent
}