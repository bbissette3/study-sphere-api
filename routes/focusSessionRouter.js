const express = require("express");
const verifyToken = require("../middleware/authJwt");
const focusSessionController = require("../controllers/focusSessionController");

const focusSessionRouter = express.Router();

focusSessionRouter.get(
  "/user",
  verifyToken,
  focusSessionController.getUserFocusSessions
);

focusSessionRouter.get("/:id", focusSessionController.getFocusSessionById);

focusSessionRouter.delete(
  "/:id",
  verifyToken,
  focusSessionController.deleteFocusSession
);

focusSessionRouter.post(
  "/",
  verifyToken,
  focusSessionController.createFocusSession
);

module.exports = focusSessionRouter;
