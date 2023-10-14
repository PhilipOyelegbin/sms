const {Router} = require("express")
const {loginUser, loginStudent} = require("./auth.controller")


const router = Router()

router.post("/users", loginUser)

router.post("/students", loginStudent)


module.exports = router