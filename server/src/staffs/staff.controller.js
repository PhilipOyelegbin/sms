const staffService = require("./staff.service")

// get all staffs
const getAllStaff = async(req, res) => {
  try {
    const allStaff = await staffService.getAllStaff()
    if(allStaff?.length <= 0) {
      return res.status(404).send({message: "No staff in the database"});
    }
    return res.status(200).send({message: "All staffs found", allStaff})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

// get a staff by email
const getOneStaff = async(req, res) => {
  try {
    const {id: email} = req.params;
    const staff = await staffService.getOneStaff(email);
    if (!staff) {
      return res.status(404).send({message: "Staff not found"});
    }
    return res.status(200).send({message: "Staff found", staff })
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
};

// create a new staff
const createStaff = async(req, res) => {
  try {
    const {first_name, last_name, email, phone_number, gender, date_of_birth, role, subject, home_address, password} = req.body
    if(!(first_name, last_name, email, phone_number, gender, date_of_birth, role, home_address, password)) {
      return res.status(400).send({message: "All fields are required"})
    }
    await staffService.createStaff({...req.body, subject: subject?.split(",")}).then(staff =>
      res.status(201).send({message: "New staff added successfully", staff})
    ).catch(err =>
      res.status(409).send({message: err})
    )
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

// update an existing staff by email
const updateStaff = async(req, res) => {
  try {
    const {id: email} = req.params
    if(email === "") {
      return res.status(400).send({message: "The email is required"})
    }
    const {subject} = req.body
    const modStaff = await staffService.updateStaff(email, {...req.body, subject: subject?.split(",")})
    if(!modStaff) {
      return res.status(404).send({message: "Staff not found"})
    }
    return res.status(200).send({message: "The staff with the email provided updated", modStaff})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

// delete a staff by email
const deleteStaff = async(req, res) => {
  try {
    const {id: email} = req.params
    if(!email) {
      return res.status(400).send({message: "Email is required"})
    }
    const erasedStaff = await staffService.deleteStaff(email)
    if (!erasedStaff) {
      return res.status(404).send({message: "Staff not found"});
    }
    return res.status(200).send({message: "The staff with the provided email has been deleted", erasedStaff})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}


module.exports = {
  getAllStaff,
  getOneStaff,
  createStaff,
  updateStaff,
  deleteStaff
}