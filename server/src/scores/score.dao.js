const scoreModel = require("./score.model")


const getAllScore = async() => await scoreModel.find({})

const getOneScore = async(id) => await scoreModel.findById({_id: id});

const getScoreByStudent = async(email) => await scoreModel.findOne({student: email});

const createScore = async(newScore) => await scoreModel.create(newScore)

const updateScore = async(id, scoreData) => await scoreModel.findByIdAndUpdate(
  {_id: id},
  scoreData,
  {new: true, runValidators: true}
)

const deleteScore = async(id) => await scoreModel.findByIdAndDelete({_id: id})


module.exports = {
  getAllScore,
  getOneScore,
  getScoreByStudent,
  createScore,
  updateScore,
  deleteScore
}