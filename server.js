require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

const corsOptions = {
  origin: "*",
};

// middleware;
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//api test
app.get("/", (req, resp) => {
  resp.json({ message: "Server is live" });
});

//all routes
const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const focusSessionRouter = require("./routes/focusSessionRouter");
const resourceRouter = require("./routes/resourceRouter");
const topicRouter = require("./routes/topicRouter");
const userTopicRouter = require("./routes/userTopicRouter");

//use the routes for all request
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/focusSessions", focusSessionRouter);
app.use("/api/resources", resourceRouter);
app.use("/api/topics", topicRouter);
app.use("/api/userTopics", userTopicRouter);

//port
const PORT = process.env.PORT || 8888;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//server
app.listen(PORT, (req, res) => {
  console.log(`running on port ${PORT}`);
});
