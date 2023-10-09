const userModel = require("./user.model")


const getAllUser = async() => await userModel.find({})

const getOneUser = async(email) => await userModel.findOne({email})

const createUser = async(newUser) => await userModel.create(newUser)

const updateUser = async(email, userData) => await userModel.findOneAndUpdate(
  {email},
  userData,
  {new: true, runValidators: true}
)

const deleteUser = async(email) => await userModel.findOneAndDelete({email})


module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}