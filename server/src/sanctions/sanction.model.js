const {Schema, model} = require("mongoose")

const sanctionSchema = new Schema({
  student: {
    type: Schema.Types.String,
    ref: "sms_students",
    require: [true, "student email is required"]
  },
  incident: {
    type: String,
    require: [true, "incident is required"]
  },
  details: {
    type: String,
    require: [true, "incident details is required"]
  },
  date: {
    type: Date,
    require: [true, "date of the incident is required"],
  },
  time: {
    type: String,
    require: [true, "time of the incident is required"],
  },
  location: {
    type: String,
    require: [true, "location of the incident score is required"],
  },
  witnesses: {
    type: Array,
  },
  penalties: {
    type: String,
    require: [true, "the penalty for the incident is required"],
  },
  official: {
    type: String,
    require: [true, "name of the school official is required"],
  },
  comment: {
    type: String,
  }
}, {timestamps: true})

const sanctionModel = model("sms_sanction", sanctionSchema)

module.exports = sanctionModel