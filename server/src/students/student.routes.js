const {Router} = require("express")
const {getAllStudent, getOneStudent, createStudent, updateStudent, deleteStudent} = require("./student.controller")
const {restrict} = require("../authentication/auth.middleware")


const router = Router()

router.route("/").get(restrict("Admin", "Teacher"), getAllStudent).post(restrict("Admin", "Teacher"), createStudent)

router.route("/:id").get(restrict("Admin", "Teacher", "Student"), getOneStudent).patch(restrict("Admin", "Teacher"), updateStudent).delete(restrict("Admin"), deleteStudent)

module.exports = router