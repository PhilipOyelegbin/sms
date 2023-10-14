const sanctionModel = require("./sanction.model")


const getAllSanction = async() => await sanctionModel.find({})

const getOneSanction = async(id) => await sanctionModel.findById({_id: id});

const getSanctionByStudent = async(email) => await sanctionModel.findOne({student: email});

const createSanction = async(newSanction) => await sanctionModel.create(newSanction)

const updateSanction = async(id, sanctionData) => await sanctionModel.findByIdAndUpdate(
  {_id: id},
  sanctionData,
  {new: true, runValidators: true}
)

const deleteSanction = async(id) => await sanctionModel.findByIdAndDelete({_id: id})


module.exports = {
  getAllSanction,
  getOneSanction,
  getSanctionByStudent,
  createSanction,
  updateSanction,
  deleteSanction
}