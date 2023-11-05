const studentModel = require("./student.model")


const getAllStudent = async() => await studentModel.find({})

const getOneStudent = async(email) => await studentModel.findOne({email})

const createStudent = async(newStudent) => await studentModel.create(newStudent)

const updateStudent = async(email, studentData) => await studentModel.findOneAndUpdate(
  {email},
  studentData,
  {new: true, runValidators: true}
)

const deleteStudent = async(email) => await studentModel.findOneAndDelete({email})


module.exports = {
  getAllStudent,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent
}