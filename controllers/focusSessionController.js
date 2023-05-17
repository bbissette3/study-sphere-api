const db = require("../models");

const FocusSession = db.focusSession;

// Create a new Focus Session
const createFocusSession = async (req, res) => {
  try {
    const focusSession = await FocusSession.create({
      userId: req.userId,
      topicId: req.params.topicId,
      learned: req.body.learned,
      toLearn: req.body.toLearn,
    });
    res.send({ message: "Focus Session created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve all Focus Sessions for a Topic
const getAllFocusSessionsForTopic = async (req, res) => {
  try {
    const focusSessions = await FocusSession.findAll({
      where: { topicId: req.params.topicId },
    });
    res.send(focusSessions);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve a single Focus Session with id
const getFocusSessionById = async (req, res) => {
  try {
    const focusSession = await FocusSession.findByPk(req.params.id);
    if (focusSession) {
      res.send(focusSession);
    } else {
      res.status(404).send({ message: "Focus Session not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a Focus Session with id
const updateFocusSession = async (req, res) => {
  try {
    const focusSession = await FocusSession.update(
      {
        learned: req.body.learned,
        toLearn: req.body.toLearn,
      },
      {
        where: { id: req.params.id, userId: req.userId },
      }
    );
    // ...
  } catch (err) {
    // ...
  }
};

// Delete a Focus Session with id
const deleteFocusSession = async (req, res) => {
  try {
    const focusSession = await FocusSession.destroy({
      where: { id: req.params.id, userId: req.userId },
    });
    // ...
  } catch (err) {
    // ...
  }
};

module.exports = {
  createFocusSession,
  getAllFocusSessionsForTopic,
  getFocusSessionById,
  updateFocusSession,
  deleteFocusSession,
};
