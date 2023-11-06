const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")


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
  gender: {
    type: String,
    enum: {values: ["Male", "Female", "Transgender"], message: "{VALUE} is not supported"},
    require: [true, "gender is required"],
  },
  date_of_birth: {
    type: Date,
    require: [true, "date of birth is required"],
  },
  class: {
    type: String,
    enum: {values: ["Primary1", "Primary2", "Primary3", "Primary4", "Primary5", "Primary6","JSS1", "JSS2", "JSS3"], message: "{VALUE} is not supported"},
    require: [true, "class is required"],
  },
  blood_group: {
    type: String,
    require: [true, "blood group is required"],
  },
  medical_information: {
    type: String,
  },
  disabilities: {
    type: String,
  },
  guardian_name: {
    type: String,
    require: [true, "guardian name is required"],
  },
  relationship: {
    type: String,
    require: [true, "relationship is required"],
  },
  guardian_email: {
    type: String,
    require: [true, "guardian email is required"],
  },
  guardian_phone_number: {
    type: String,
    require: [true, "guardian phone number is required"],
  },
  guardian_address: {
    type: String,
    require: [true, "guardian address is required"],
  },
  emergency_name: {
    type: String,
    require: [true, "emergency name is required"],
  },
  emergency_phone_number: {
    type: String,
    require: [true, "emergency phone number is required"],
  },
  emergency_address: {
    type: String,
    require: [true, "emergency address is required"],
  },
  role: {
    type: String,
    default: "Student"
  },
  password: {
    type: String,
    require: [true, "password is required"],
    minlength: [6, "min number of 6 characters"],
    select: false
  }
}, {timestamps: true})

// password encryption
studentSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next()

  // encrypt the password before saving
  this.password = await bcrypt.hash(this.password, 16)
  next()
})

// Define pre middleware for findByIdAndUpdate
studentSchema.pre('findOneAndUpdate', async function(next) {
  if (this._update.password) {
    const hashedPassword = await bcrypt.hash(this._update.password, 16);
    this._update.password = hashedPassword;
    next();
  }
  // If password is not provided in the update, move to the next middleware
  return next();
});

// password comparison for login function
studentSchema.methods.comparePwd = async function(pwd, pwdDB) {
  // compare the password for login
  return await bcrypt.compare(pwd, pwdDB)
}

const studentModel = model("sms_students", studentSchema)

module.exports = studentModel