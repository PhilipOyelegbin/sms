const {Router} = require("express")
const {getAllStaff, getOneStaff, createStaff, updateStaff, deleteStaff} = require("./staff.controller")
const {restrict} = require("../authentication/auth.middleware")


const router = Router()

router.route("/").get(restrict("Admin"), getAllStaff).post(restrict("Admin"), createStaff)

router.route("/:id").get(restrict("Admin", "Teacher"), getOneStaff).patch(restrict("Admin"), updateStaff).delete(restrict("Admin"), deleteStaff)

module.exports = router