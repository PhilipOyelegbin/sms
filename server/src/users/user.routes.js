const {Router} = require("express")
const {getAllUser, getOneUser, createUser, updateUser, deleteUser} = require("./user.controller")
const {restrict} = require("../authentication/auth.middleware")


const router = Router()

router.route("/").get(restrict("Admin"), getAllUser).post(restrict("Admin"), createUser)

router.route("/:id").get(restrict("Admin", "Teacher"), getOneUser).patch(restrict("Admin"), updateUser).delete(restrict("Admin"), deleteUser)

module.exports = router