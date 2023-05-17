const db = require("../models");

const Comment = db.comments;

// Create a new Comment
const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      userId: req.userId,
      topicId: req.params.topicId,
    });
    res.send({ message: "Comment created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve all Comments for a Topic
const getAllCommentsForTopic = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { topicId: req.params.topicId },
    });
    res.send(comments);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve a single Comment with id
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a Comment with id
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.update(
      { text: req.body.text },
      { where: { id: req.params.id, userId: req.userId } }
    );
    // ...
  } catch (err) {
    // ...
  }
};

// Delete a Comment with id
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: { id: req.params.id, userId: req.userId },
    });
    // ...
  } catch (err) {
    // ...
  }
};

module.exports = {
  createComment,
  getAllCommentsForTopic,
  getCommentById,
  updateComment,
  deleteComment,
};
