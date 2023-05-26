const express = require("express");
const verifyToken = require("../middleware/authJwt");
const focusSessionController = require("../controllers/focusSessionController");

const focusSessionRouter = express.Router();

focusSessionRouter.post(
  "/:topicId",
  verifyToken,
  focusSessionController.createFocusSession
);

focusSessionRouter.get("/:id", focusSessionController.getFocusSessionById);
focusSessionRouter.delete(
  "/:id",
  verifyToken,
  focusSessionController.deleteFocusSession
);

focusSessionRouter.get(
  "/user",
  verifyToken,
  focusSessionController.getUserFocusSessions
);

module.exports = focusSessionRouter;
