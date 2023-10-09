const studentService = require("./student.service")


const getAllStudent = async(req, res) => {
  try {
    const allStudent = await studentService.getAllStudent()
    if(allStudent?.length <= 0) {
      return res.status(404).send({message: "No student in the database"});
    }
    return res.status(200).send({message: "All student found", allStudent})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const getOneStudent = async(req, res) => {
  try {
    const {id: email} = req.params;
    if(!email) {
      return res.status(400).send({message: "The email is required"})
    }
    const student = await studentService.getOneStudent(email);
    if (!student) {
      return res.status(404).send({message: "Student not found"});
    }
    return res.status(200).send({message: "Student found", student})
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
};

const createStudent = async(req, res) => {
  try {
    const {first_name, last_name, email, password} = req.body
    if(!(first_name, last_name, email, password)) {
      return res.status(400).send({message: "All fields are required"})
    }
    await studentService.createStudent(req.body).then(student =>
      res.status(201).send({message: "New student added successfully", student})
    ).catch(err =>
      res.status(409).send({message: err})
    )
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const updateStudent = async(req, res) => {
  try {
    const {id: email} = req.params
    if(!email) {
      return res.status(400).send({message: "The email is required"})
    }
    const modStudent = await studentService.updateStudent(email, req.body)
    if(!modStudent) {
      return res.status(404).send({message: "Student not found"})
    }
    return res.status(200).send({message: "The student with the email provided updated", modStudent})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const deleteStudent = async(req, res) => {
  try {
    const {id: email} = req.params
    if(!email) {
      return res.status(400).send({message: "Email is required"})
    }
    const erasedStudent = await studentService.deleteStudent(email)
    if (!erasedStudent) {
      return res.status(404).send({message: "Student not found"});
    }
    return res.status(200).send({message: "The student with the provided email has been deleted", erasedStudent})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}


module.exports = {
  getAllStudent,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent
}