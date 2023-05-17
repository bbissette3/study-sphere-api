const db = require("../models");

const UserTopic = db.userTopic;

// Add a User to a Topic
const addUserToTopic = async (req, res) => {
  try {
    const userTopic = await UserTopic.create({
      userId: req.userId,
      topicId: req.params.topicId,
    });
    res.send({ message: "User added to the topic successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Remove a User from a Topic
const removeUserFromTopic = async (req, res) => {
  try {
    const result = await UserTopic.destroy({
      where: { userId: req.userId, topicId: req.params.topicId },
    });
    if (result === 0) {
      res.status(404).send({ message: "User not found in the topic" });
    } else {
      res.send({ message: "User removed from the topic successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addUserToTopic,
  removeUserFromTopic,
};
