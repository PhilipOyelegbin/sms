const scoreDao = require("./score.dao")


const getAllScore = () => scoreDao.getAllScore()

const getOneScore = (id) => scoreDao.getOneScore(id)

const getScoreByStudent = (email) => scoreDao.getScoreByStudent(email)

const createScore = (newScore) => scoreDao.createScore(newScore)

const updateScore = (id, score) => scoreDao.updateScore(id, score)

const deleteScore = (id) => scoreDao.deleteScore(id)


module.exports = {
  getAllScore,
  getOneScore,
  getScoreByStudent,
  createScore,
  updateScore,
  deleteScore
}