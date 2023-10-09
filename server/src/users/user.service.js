const userDao = require("./user.dao")


const getAllUser = () => userDao.getAllUser()

const getOneUser = (email) => userDao.getOneUser(email)

const createUser = (newUser) => userDao.createUser(newUser)

const updateUser = (email, user) => userDao.updateUser(email, user)

const deleteUser = (email) => userDao.deleteUser(email)


module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}