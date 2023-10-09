const scoreService = require("./score.service")
const studentService = require("../students/student.service")
const grader = require("../config/grader")


const getAllScore = async(req, res) => {
  try {
    const allScore = await scoreService.getAllScore()
    if(allScore?.length <= 0) {
      return res.status(404).send({message: "No score in the database"});
    }
    return res.status(200).send({message: "All score found", allScore})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const getOneScore = async(req, res) => {
  try {
    const {id} = req.params;
    if(!id) {
      return res.status(400).send({message: "The ID is required"})
    }
    const score = await scoreService.getOneScore(id);
    if (!score) {
      return res.status(404).send({message: "Score with the provided ID not found"});
    }
    return res.status(200).send({message: "Score with the provided ID found", score})
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
};

const getScoreByStudent = async(req, res) => {
  try {
    const {student} = req.query;
    if(!student) {
      return res.status(400).send({message: "The email is required"})
    }
    const score = await scoreService.getScoreByStudent(student);
    if (!score) {
      return res.status(404).send({message: "Score with the provided email not found"});
    }
    return res.status(200).send({message: "All score with the provide email found", score})
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
};

const createScore = async(req, res) => {
  try {
    const {math, english, biology, government, session, student} = req.body
    if(!(math, english, biology, government, session, student)) {
      return res.status(400).send({message: "All fields are required"})
    }

    // calculate the grade
    let ReqValue = Object.values(req.body).map(value => value)
    const calGrade = await grader.calculateTotalMarks(req.body)
      .then(totalMarks => grader.calculateAverageMarks(totalMarks, ReqValue.length-2))
      .then(grade=> grader.calculateGrade(grade))
      .catch(err => err)

    // find the student if it exist or not
    const findStudent = await studentService.getOneStudent(student)
    if(!findStudent) {
      return res.status(404).json({error: "Student does not exist"})
    }
    await scoreService.createScore({...req.body, grade: calGrade}).then(score =>
      res.status(201).send({message: "New score added successfully", score})
    ).catch(err =>
      res.status(409).send({message: err})
    )
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const updateScore = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).send({message: "The ID is required"})
    }

    // calculate the grade
    let ReqValue = Object.values(req.body).map(value => value)
    const calGrade = await grader.calculateTotalMarks(req.body)
      .then(totalMarks => grader.calculateAverageMarks(totalMarks, ReqValue.length-2))
      .then(grade=> marks.calculateGrade(grade))
      .catch(err => err)

    const modScore = await scoreService.updateScore(id, {...req.body, grade: calGrade})
    if(!modScore) {
      return res.status(404).send({message: "Score not found"})
    }
    return res.status(200).send({message: "The score with the provided ID updated", modScore})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

const deleteScore = async(req, res) => {
  try {
    const {id} = req.params
    if(!id) {
      return res.status(400).send({message: "The ID is required"})
    }
    const erasedScore = await scoreService.deleteScore(id)
    if (!erasedScore) {
      return res.status(404).send({message: "Score not found"});
    }
    return res.status(200).send({message: "The score with the provided ID has been deleted", erasedScore})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}


module.exports = {
  getAllScore,
  getOneScore,
  getScoreByStudent,
  createScore,
  updateScore,
  deleteScore
}