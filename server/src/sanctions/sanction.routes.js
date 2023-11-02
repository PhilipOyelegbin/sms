const {Router} = require("express")
const {
  getAllSanction,
  getOneSanction,
  getSanctionByStudent,
  createSanction,
  updateSanction,
  deleteSanction
} = require("./sanction.controller")
const {restrict} = require("../authentication/auth.middleware")


const router = Router()

router.route("/").get(restrict("Admin", "Teacher"), getAllSanction).post(restrict("Admin", "Teacher"), createSanction)

router.get("/query", restrict("Admin", "Teacher", "Student"), getSanctionByStudent)

router.route("/:id").get(restrict("Admin", "Teacher", "Student"), getOneSanction).patch(restrict("Admin", "Teacher"), updateSanction).delete(restrict("Admin", "Teacher"), deleteSanction)


module.exports = router