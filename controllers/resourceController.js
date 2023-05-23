const db = require("../models");

const Resource = db.resources;
const Topic = db.topics;

// Create a new resource
const createResource = async (req, res) => {
  try {
    const { url, topicId } = req.body;

    // Check if the associated topic exists
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      return res.status(404).send({ message: "Topic not found" });
    }

    const resource = await Resource.create({
      url,
      topicId,
    });

    res.send({ message: "Resource created successfully!", resource });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.send(resources);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve a single resource with id
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (resource) {
      res.send(resource);
    } else {
      res.status(404).send({ message: "Resource not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a resource with id
const updateResource = async (req, res) => {
  try {
    const { url } = req.body;

    const resource = await Resource.update(
      {
        url,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (resource[0] === 0) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send({ message: "Resource updated successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a resource with id
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.destroy({
      where: { id: req.params.id },
    });
    if (resource === 0) {
      res.status(404).send({ message: "Resource not found" });
    } else {
      res.send({ message: "Resource deleted successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};
