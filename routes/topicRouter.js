const express = require("express");
const verifyToken = require("../middleware/authJwt");
const topicController = require("../controllers/topicController");
const topicValidations = require("../validations/topicValidations");

const topicRouter = express.Router();

topicRouter.post(
  "/",
  verifyToken,
  topicValidations.createTopicValidation,
  topicController.createTopic
);

topicRouter.get("/", verifyToken, topicController.getAllTopics);
topicRouter.get("/user", verifyToken, topicController.getUserTopics);

topicRouter.get(
  "/user/subscribed",
  verifyToken,
  topicController.getUserSubscribedTopics
);

topicRouter.get("/:id", topicController.getTopicById);
topicRouter.put(
  "/:id",
  verifyToken,
  topicValidations.updateTopicValidation,
  topicController.updateTopic
);
topicRouter.delete("/:id", verifyToken, topicController.deleteTopic);

module.exports = topicRouter;
