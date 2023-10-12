const {Schema, model} = require("mongoose")

const scoreSchema = new Schema({
  math: {
    type: Number,
    require: [true, "math is required"],
    default: 0
  },
  english: {
    type: Number,
    require: [true, "english is required"],
    default: 0
  },
  biology: {
    type: Number,
    require: [true, "biology is required"],
    default: 0
  },
  government: {
    type: Number,
    require: [true, "government is required"],
    default: 0
  },
  grade: {
    type: String,
    require: [true, "grade is required"],
  },
  session: {
    type: String,
    require: [true, "session is required"],
  },
  student: {
    type: Schema.Types.String,
    ref: "sms_students",
    require: [true, "student email is required"],
  }
}, {timestamps: true})

const scoreModel = model("sms_scores", scoreSchema)

module.exports = scoreModel