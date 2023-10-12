const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config()

const db = require("./src/config/db")
const authRouter = require("./src/authentication")
const userRouter = require("./src/users")
const studentRouter = require("./src/students")
const scoreRouter = require("./src/scores")
const {verifyToken} = require("./src/authentication/auth.middleware")

const app = express()

// middleware
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(cors({origin: ["http://localhost:4000/*", "https://schoolmanagementsystem-api.vercel.app"]}))

// Routes
app.use("/auth", authRouter);
app.use("/v1/users", verifyToken, userRouter);
app.use("/v1/students", verifyToken, studentRouter);
app.use("/v1/scores", verifyToken, scoreRouter);

app.get("/*", (req, res) => {
  res.status(404).sendFile(dirname + "error.html")
})

const server = () => {
  db(process.env.DB_URI)
  app.listen(process.env.API_PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.API_PORT}`)
  })
}

server()