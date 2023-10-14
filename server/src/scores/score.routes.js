const {Router} = require("express")
const {
  getAllScore,
  getOneScore,
  getScoreByStudent,
  createScore,
  updateScore,
  deleteScore
} = require("./score.controller")
const {restrict} = require("../authentication/auth.middleware")


const router = Router()

router.route("/").get(restrict("Admin", "Teacher"), getAllScore).post(restrict("Admin", "Teacher"), createScore)

router.get("/query", restrict("Admin", "Teacher", "User"), getScoreByStudent)

router.route("/:id").get(restrict("Admin", "Teacher"), getOneScore).patch(restrict("Admin", "Teacher"), updateScore).delete(restrict("Admin", "Teacher"), deleteScore)


module.exports = router