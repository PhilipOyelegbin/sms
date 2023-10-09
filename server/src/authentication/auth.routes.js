const {Router} = require("express")
const authController = require("./auth.controller")


const router = Router()

router.post("/users", async(req, res) => {
  try {
    const {email, password} = req.body
    if(!(email && password)) {
      return res.status(400).send({message: "All fields are required"})
    }
    const user = await authController.loginUser(req.body)
    if(!user) {
      return res.status(403).send({message: "User authentication failed... input the right details"})
    }
    return res.status(200).send({message: "The user has been authenticated", user})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
})

router.post("/students", async(req, res) => {
  try {
    const {email, password} = req.body
    if(!(email && password)) {
      return res.status(400).send({message: "All fields are required"})
    }
    const student = await authController.loginStudent(req.body)
    if(!student) {
      return res.status(403).send({message: "Student authentication failed... input the right details"})
    }
    return res.status(200).send({message: "The student has been authenticated", student})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
})


module.exports = router