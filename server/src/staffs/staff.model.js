const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")


// database schema for staff
const staffSchema = new Schema({
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
  phone_number: {
    type: String,
    require: [true, "phone number is required"],
  },
  gender: {
    type: String,
    enum: {values: ["Male", "Female", "Others"], message: "{VALUE} is not supported"},
    require: [true, "gender is required"],
  },
  date_of_birth: {
    type: Date,
    require: [true, "date oof birth is required"],
  },
  role: {
    type: String,
    enum: {values: ["Admin", "Teacher"], message: "{VALUE} is not supported"},
    require: [true, "role is required"],
  },
  subject: {
    type: Array,
  },
  home_address: {
    type: String,
    require: [true, "home address is required"],
  },
  password: {
    type: String,
    require: [true, "password is required"],
    minlength: [6, "min number of 6 characters"],
    select: false
  }
}, {timestamps: true})

// password encryption
staffSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next()

  // encrypt the password before saving
  this.password = await bcrypt.hash(this.password, 16)
  next()
})

// password comparison for login function
staffSchema.methods.comparePwd = async function(pwd, pwdDB) {
  // compare the password for login
  return await bcrypt.compare(pwd, pwdDB)
}


const staffModel = model("sms_staffs", staffSchema)

module.exports = staffModel