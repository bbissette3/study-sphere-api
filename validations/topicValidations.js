const { body } = require("express-validator");

exports.createTopicValidation = [
  // title must not be empty
  body("title").notEmpty().withMessage("Title is required"),
  // subject must not be empty
  body("subject").notEmpty().withMessage("Subject is required"),
  // description must not be empty
  body("description").notEmpty().withMessage("Description is required"),
];

exports.updateTopicValidation = [
  // title must not be empty
  body("title").notEmpty().withMessage("Title is required"),
  // subject must not be empty
  body("subject").notEmpty().withMessage("Subject is required"),
  // description must not be empty
  body("description").notEmpty().withMessage("Description is required"),
];
