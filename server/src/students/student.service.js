const studentDao = require("./student.dao")


const getAllStudent = () => studentDao.getAllStudent()

const getOneStudent = (email) => studentDao.getOneStudent(email)

const createStudent = (newStudent) => studentDao.createStudent(newStudent)

const updateStudent = (email, student) => studentDao.updateStudent(email, student)

const deleteStudent = (email) => studentDao.deleteStudent(email)


module.exports = {
  getAllStudent,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent
}