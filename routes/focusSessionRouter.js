const express = require("express");
const verifyToken = require("../middleware/authJwt");
const focusSessionController = require("../controllers/focusSessionController");

const focusSessionRouter = express.Router();

focusSessionRouter.post(
  "/:topicId",
  verifyToken,
  focusSessionController.createFocusSession
);
focusSessionRouter.get(
  "/:topicId",
  focusSessionController.getAllFocusSessionsForTopic
);
focusSessionRouter.get("/:id", focusSessionController.getFocusSessionById);
focusSessionRouter.put(
  "/:id",
  verifyToken,
  focusSessionController.updateFocusSession
);
focusSessionRouter.delete(
  "/:id",
  verifyToken,
  focusSessionController.deleteFocusSession
);

module.exports = focusSessionRouter;
