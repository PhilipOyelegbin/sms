const {Router} = require("express")
const {loginStaff, loginStudent} = require("./auth.controller")


const router = Router()

router.post("/staffs", loginStaff)

router.post("/students", loginStudent)


module.exports = router