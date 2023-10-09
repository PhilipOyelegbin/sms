const mongoose = require("mongoose")

async function db(uri) {
  await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => console.log("Database connected!"))
    .catch(error => {
      console.error("Unable to establish connection....Exiting now", error)
      process.exit(1)
    })
}

module.exports = db