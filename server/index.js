const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config()
const serverless = require("serverless-http");


const db = require("./src/config/db")
const authRouter = require("./src/authentication")
const userRouter = require("./src/users")
const studentRouter = require("./src/students")
const scoreRouter = require("./src/scores")
const sanctionRouter = require("./src/sanctions")
const {verifyToken} = require("./src/authentication/auth.middleware")

const api = express()


// Allow only specific origins (replace these with your frontend URLs)
const allowedOrigins = ["http://localhost:3000", 'https://studentmanagementsystem-app.vercel.app/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// middleware
api.use(express.json())
api.use(express.urlencoded({extended: false}))
// api.use(helmet())
api.use(cors())


// Routes
api.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html")
});

api.use("/auth", authRouter);
api.use("/v1/users", verifyToken, userRouter);
api.use("/v1/students", verifyToken, studentRouter);
api.use("/v1/scores", verifyToken, scoreRouter);
api.use("/v1/sanctions", verifyToken, sanctionRouter);

api.get("/*", (req, res) => {
  res.status(404).sendFile(__dirname + "/error.html")
})


const server = async() => {
  await db(process.env.DB_URI)
  api.listen(process.env.API_PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.API_PORT}`)
  })
}

server()

export const handler = serverless(api);