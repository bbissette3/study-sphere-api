const db = require("../models");
const FocusSession = db.focusSession;

// Create a new Focus Session
const createFocusSession = async (req, res) => {
  try {
    const focusSession = await FocusSession.create({
      userId: req.userId,
      topicId: req.body.topicId,
      learned: req.body.learned,
      toLearn: req.body.toLearn,
      duration: req.body.duration,
    });
    res.send(focusSession);
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

// Retrieve all Focus Sessions by User
const getUserFocusSessions = async (req, res) => {
  try {
    const focusSessions = await FocusSession.findAll({
      where: { userId: req.userId },
    });
    if (focusSessions) {
      res.send(focusSessions);
    } else {
      res.status(404).send({ message: "No Focus Sessions found for user" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a Focus Session with id
const deleteFocusSession = async (req, res) => {
  try {
    const focusSession = await FocusSession.destroy({
      where: { id: req.params.id, userId: req.userId },
    });

    if (focusSession) {
      res.send({ message: "Focus Session deleted successfully!" });
    } else {
      res.status(404).send({ message: "Focus Session not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createFocusSession,
  getFocusSessionById,
  getUserFocusSessions,
  deleteFocusSession,
};
