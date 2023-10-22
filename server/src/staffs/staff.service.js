const staffDao = require("./staff.dao")


const getAllStaff = () => staffDao.getAllStaff()

const getOneStaff = (email) => staffDao.getOneStaff(email)

const createStaff = (newStaff) => staffDao.createStaff(newStaff)

const updateStaff = (email, staff) => staffDao.updateStaff(email, staff)

const deleteStaff = (email) => staffDao.deleteStaff(email)


module.exports = {
  getAllStaff,
  getOneStaff,
  createStaff,
  updateStaff,
  deleteStaff
}