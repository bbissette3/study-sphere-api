const db = require("../models");
const Topic = db.topics;

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.send(topics);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id);
    if (topic) {
      res.send(topic);
    } else {
      res.status(404).send({ message: "Resource not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createTopic = async (req, res) => {
  try {
    const topic = await Topic.create({
      title: req.body.title,
      subject: req.body.subject,
      description: req.body.description,
      userId: req.userId,
    });
    res.send({ message: "Topic created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.update(
      {
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description,
      },
      {
        where: { id: req.params.id, userId: req.userId },
      }
    );
    if (topic[0] === 0) {
      res.status(404).send({ message: "Topic not found" });
    } else {
      res.send({ message: "Topic updated successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.destroy({
      where: { id: req.params.id },
    });
    if (topic === 0) {
      res.status(404).send({ message: "Topic not found" });
    } else {
      res.send({ message: "Topic deleted successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createTopic,
  updateTopic,
  getAllTopics,
  getTopicById,
  deleteTopic,
};
