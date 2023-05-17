const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const corsOptions = {
  origin: "https://localhost:8080",
};

//middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//api test
app.get("/", (req, resp) => {
  resp.json({ message: "Server is live" });
});

//all routes
const userRouter = require("./routes/userRouter");

//use the routes for all request
app.use("/api/users", userRouter);

//port
const PORT = process.env.PORT || 8888;

//server
app.listen(PORT, (req, res) => {
  console.log(`running on port ${PORT}`);
});
