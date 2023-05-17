const { body, validationResult } = require("express-validator");

exports.updateUserValidation = [
  // username must not be empty
  body("username").notEmpty().withMessage("Username is required"),
  // email must be in valid format
  body("email").isEmail().withMessage("Email is not valid"),
];

exports.registerUserValidation = [
  // username must not be empty
  body("username").notEmpty().withMessage("Username is required"),
  // email must be in valid format
  body("email").isEmail().withMessage("Email is not valid"),
  // password must be at least 6 characters long
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.handleValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
