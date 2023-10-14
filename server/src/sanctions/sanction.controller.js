const sanctionService = require("./sanction.service")
const studentService = require("../students/student.service")


const getAllSanction = async(req, res) => {
  try {
    const allSanction = await sanctionService.getAllSanction()
    if(allSanction?.length <= 0) {
      return res.status(404).send({message: "No sanction in the database"});
    }
    return res.status(200).send({message: "All sanction found", allSanction})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const getOneSanction = async(req, res) => {
  try {
    const {id} = req.params;
    if(!id) {
      return res.status(400).send({message: "The ID is required"})
    }
    const sanction = await sanctionService.getOneSanction(id);
    if (!sanction) {
      return res.status(404).send({message: "Sanction with the provided ID not found"});
    }
    return res.status(200).send({message: "Sanction with the provided ID found", sanction})
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
};

const getSanctionByStudent = async(req, res) => {
  try {
    const {student} = req.query;
    if(!student) {
      return res.status(400).send({message: "The email is required"})
    }
    const sanction = await sanctionService.getSanctionByStudent(student);
    if (!sanction) {
      return res.status(404).send({message: "Sanction with the provided email not found"});
    }
    return res.status(200).send({message: "All sanction with the provide email found", sanction})
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
};

const createSanction = async(req, res) => {
  try {
    const {student, incident, details, time, location, penalties, official} = req.body
    if(!(student, incident, details, time, location, penalties, official)) {
      return res.status(400).send({message: "All fields are required"})
    }

    // find the student if it exist or not
    const findStudent = await studentService.getOneStudent(student)
    if(!findStudent) {
      return res.status(404).json({error: "Student does not exist"})
    }
    await sanctionService.createSanction(req.body).then(sanction =>
      res.status(201).send({message: "New sanction added successfully", sanction})
    ).catch(err =>
      res.status(409).send({message: err})
    )
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const updateSanction = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).send({message: "The ID is required"})
    }

    const modSanction = await sanctionService.updateSanction(id, req.body)
    if(!modSanction) {
      return res.status(404).send({message: "Sanction not found"})
    }
    return res.status(200).send({message: "The sanction with the provided ID updated", modSanction})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const deleteSanction = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).send({message: "The ID is required"})
    }
    const erasedSanction = await sanctionService.deleteSanction(id)
    if (!erasedSanction) {
      return res.status(404).send({message: "Sanction not found"});
    }
    return res.status(200).send({message: "The sanction with the provided ID has been deleted", erasedSanction})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}


module.exports = {
  getAllSanction,
  getOneSanction,
  getSanctionByStudent,
  createSanction,
  updateSanction,
  deleteSanction
}