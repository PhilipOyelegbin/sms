const staffModel = require("./staff.model")


const getAllStaff = async() => await staffModel.find({})

const getOneStaff = async(email) => await staffModel.findOne({email})

const createStaff = async(newStaff) => await staffModel.create(newStaff)

const updateStaff = async(email, staffData) => await staffModel.findOneAndUpdate(
  {email},
  staffData,
  {new: true, runValidators: true}
)

const deleteStaff = async(email) => await staffModel.findOneAndDelete({email})


module.exports = {
  getAllStaff,
  getOneStaff,
  createStaff,
  updateStaff,
  deleteStaff
}