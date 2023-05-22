const db = require("../models");
const Topic = db.topics;

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll({
      include: [
        {
          model: db.resources,
          as: "resources",
        },
        {
          model: db.comments,
          as: "comments",
        },
        {
          model: db.users,
          as: "user",
        },
        {
          model: db.users,
          as: "usersInterested",
        },
      ],
    });
    res.send(topics);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id, {
      include: [
        {
          model: db.resources,
          as: "resources",
        },
        {
          model: db.comments,
          as: "comments",
        },
        {
          model: db.users,
          as: "users",
        },
      ],
    });
    if (topic) {
      res.send(topic);
    } else {
      res.status(404).send({ message: "Topic not found" });
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
    res.status(201).send(topic);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id);
    if (!topic) return res.status(404).send({ message: "Topic not found" });

    topic.title = req.body.title;
    topic.subject = req.body.subject;
    topic.description = req.body.description;
    await topic.save();

    res.send(topic);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id);
    if (!topic) return res.status(404).send({ message: "Topic not found" });

    await topic.destroy();
    res.send({ message: "Topic deleted successfully!" });
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
