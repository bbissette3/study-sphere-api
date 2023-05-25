const express = require("express");
const verifyToken = require("../middleware/authJwt");
const userTopicController = require("../controllers/userTopicController");

const userTopicRouter = express.Router();

userTopicRouter.get("/", verifyToken, userTopicController.getUserTopics);

userTopicRouter.post(
  "/:topicId",
  verifyToken,
  userTopicController.addUserToTopic
);
userTopicRouter.delete(
  "/:topicId",
  verifyToken,
  userTopicController.removeUserFromTopic
);

userTopicRouter.get(
  "/:topicId/check",
  verifyToken,
  userTopicController.checkUserSubscription
);

module.exports = userTopicRouter;
