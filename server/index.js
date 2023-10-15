const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config()

const db = require("./src/config/db")
const authRouter = require("./src/authentication")
const userRouter = require("./src/users")
const studentRouter = require("./src/students")
const scoreRouter = require("./src/scores")
const sanctionRouter = require("./src/sanctions")
const {verifyToken} = require("./src/authentication/auth.middleware")

const app = express()

const corsOptions = {
  // origin: [
    //   "http://localhost:5173",
    //   "http://localhost:4000",
    //   "https://studentsmanagementsystem.netlify.app",
  //   "https://studentmanagementsystem-api.vercel.app"
  // ],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}
// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html")
});

app.use("/auth", authRouter);
app.use("/v1/users", verifyToken, userRouter);
app.use("/v1/students", verifyToken, studentRouter);
app.use("/v1/scores", verifyToken, scoreRouter);
app.use("/v1/sanctions", verifyToken, sanctionRouter);

app.get("/*", (req, res) => {
  res.status(404).sendFile(__dirname + "/error.html")
})

const server = () => {
  db(process.env.DB_URI)
  app.listen(process.env.API_PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.API_PORT}`)
  })
}

server()
