const userService = require("./user.service")

// get all users
const getAllUser = async(req, res) => {
  try {
    const allUser = await userService.getAllUser()
    if(allUser?.length <= 0) {
      return res.status(404).send({message: "No user in the database"});
    }
    return res.status(200).send({message: "All users found", allUser})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

// get a user by email
const getOneUser = async(req, res) => {
  try {
    const {id: email} = req.params;
    const user = await userService.getOneUser(email);
    if (!user) {
      return res.status(404).send({message: "User not found"});
    }
    return res.status(200).send({message: "User found", user })
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
};

// create a new user
const createUser = async(req, res) => {
  try {
    const {first_name, last_name, email, role, subject, password} = req.body
    if(!(first_name, last_name, email, role, password)) {
      return res.status(400).send({message: "All fields are required"})
    }
    await userService.createUser({...req.body, subject: subject?.split(",")}).then(user =>
      res.status(201).send({message: "New user added successfully", user})
    ).catch(err =>
      res.status(409).send({message: err})
    )
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

// update an existing user by email
const updateUser = async(req, res) => {
  try {
    const {id: email} = req.params
    if(email === "") {
      return res.status(400).send({message: "The email is required"})
    }
    const {subject} = req.body
    const modUser = await userService.updateUser(email, {...req.body, subject: subject?.split(",")})
    if(!modUser) {
      return res.status(404).send({message: "User not found"})
    }
    return res.status(200).send({message: "The user with the email provided updated", modUser})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}

// delete a user by email
const deleteUser = async(req, res) => {
  try {
    const {id: email} = req.params
    if(!email) {
      return res.status(400).send({message: "Email is required"})
    }
    const erasedUser = await userService.deleteUser(email)
    if (!erasedUser) {
      return res.status(404).send({message: "User not found"});
    }
    return res.status(200).send({message: "The user with the provided email has been deleted", erasedUser})
  } catch (error) {
    return res.status(500).send({error: error.message})
  }
}


module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}