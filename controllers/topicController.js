const db = require("../models");
const { Op } = require("sequelize");
const { topics: Topic, userTopics: UserTopic } = db;

const getAllTopics = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const topics = await Topic.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchTerm}%` } },
          { subject: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
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
      ],
    });
    res.send(topics);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getUserTopics = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const topics = await Topic.findAll({
      where: {
        userId: req.userId,
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchTerm}%` } },
          { subject: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
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
      ],
    });
    res.send(topics);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getUserSubscribedTopics = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const userTopics = await UserTopic.findAll({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: db.topics,
          as: "topic",
          where: {
            [Op.or]: [
              { title: { [Op.iLike]: `%${searchTerm}%` } },
              { subject: { [Op.iLike]: `%${searchTerm}%` } },
            ],
          },
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
          ],
        },
      ],
    });
    const topics = userTopics.map((userTopic) => userTopic.topic);
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
          include: [
            {
              model: db.users,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
        {
          model: db.users,
          as: "user",
          attributes: ["username"],
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

const createTopic = async (req, res, next) => {
  const { title, subject, description } = req.body;
  const userId = req.userId;
  try {
    const topic = await Topic.create({
      title,
      subject,
      description,
      userId,
    });
    res.status(201).send({ topic });
  } catch (error) {
    next(error);
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
  getUserTopics,
  getTopicById,
  deleteTopic,
  getUserSubscribedTopics,
};
