const express = require("express");
const verifyToken = require("../middleware/authJwt");
const commentController = require("../controllers/commentController");

const commentRouter = express.Router();

commentRouter.post("/:topicId", verifyToken, commentController.createComment);
commentRouter.get("/:topicId", commentController.getAllCommentsForTopic);
commentRouter.get("/:id", commentController.getCommentById);
commentRouter.put("/:id", verifyToken, commentController.updateComment);
commentRouter.delete("/:id", verifyToken, commentController.deleteComment);

module.exports = commentRouter;
