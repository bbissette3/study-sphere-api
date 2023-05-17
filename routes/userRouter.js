const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authJwt");
const validations = require("../validations/userValidations");

const userRouter = express.Router();

userRouter.post(
  "/signup",
  validations.registerUserValidation,
  validations.handleValidationResults,
  userController.signUp
);

userRouter.post("/login", userController.logIn);

userRouter.put(
  "/:id",
  verifyToken,
  validations.updateUserValidation,
  validations.handleValidationResults,
  userController.updateUser
);

userRouter.delete("/:id", verifyToken, userController.deleteUser);

module.exports = userRouter;
