const {Schema, model} = require("mongoose")

const scoreSchema = new Schema({
  student: {
    type: Schema.Types.String,
    ref: "sms_students",
    require: [true, "student email is required"],
  },
  math: {
    type: Number,
    require: [true, "math score is required"],
    default: 0
  },
  english: {
    type: Number,
    require: [true, "english score is required"],
    default: 0
  },
  biology: {
    type: Number,
    require: [true, "biology score is required"],
    default: 0
  },
  government: {
    type: Number,
    require: [true, "government score is required"],
    default: 0
  },
  average: {
    type: Number,
    require: [true, "average score is required"],
  },
  grade: {
    type: String,
    require: [true, "grade is required"],
  },
  session: {
    type: String,
    require: [true, "session is required"],
  },
  comment: {
    type: String,
  }
}, {timestamps: true})

const scoreModel = model("sms_scores", scoreSchema)

module.exports = scoreModel