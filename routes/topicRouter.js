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

topicRouter.get("/", topicController.getAllTopics);
topicRouter.get("/:id", topicController.getTopicById);
topicRouter.put(
  "/:id",
  verifyToken,
  topicValidations.updateTopicValidation,
  topicController.updateTopic
);
topicRouter.delete("/:id", verifyToken, topicController.deleteTopic);

// Get a topic by ID along with its resources
// topicRouter.get("/:id/resources", topicController.getTopicWithResources);

module.exports = topicRouter;
