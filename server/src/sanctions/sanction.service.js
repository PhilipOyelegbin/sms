const sanctionDao = require("./sanction.dao")


const getAllSanction = () => sanctionDao.getAllSanction()

const getOneSanction = (id) => sanctionDao.getOneSanction(id)

const getSanctionByStudent = (email) => sanctionDao.getSanctionByStudent(email)

const createSanction = (newSanction) => sanctionDao.createSanction(newSanction)

const updateSanction = (id, sanction) => sanctionDao.updateSanction(id, sanction)

const deleteSanction = (id) => sanctionDao.deleteSanction(id)


module.exports = {
  getAllSanction,
  getOneSanction,
  getSanctionByStudent,
  createSanction,
  updateSanction,
  deleteSanction
}