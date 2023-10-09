const {Schema, model} = require("mongoose")

const studentSchema = new Schema({
  first_name: {
    type: String,
    require: [true, "first name is required"],
    maxlength: [50, "max number of 50 characters"]
  },
  last_name: {
    type: String,
    require: [true, "last name is required"],
    maxlength: [50, "max number of 50 characters"]
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: [true, "email is unique"],
    index: true
  },
  class: {
    type: String,
    enum: {values: ["JSS1", "JSS2", "JSS3"], message: "{VALUE} is not supported"},
    require: [true, "class is required"],
  },
  role: {
    type: String,
    default: "User"
  },
  password: {
    type: String,
    require: [true, "password is required"],
    minlength: [6, "min number of 6 characters"],
    select: false
  }
}, {timestamps: true})

const studentModel = model("sms_students", studentSchema)

module.exports = studentModel