const express = require("express");
const verifyToken = require("../middleware/authJwt");
const resourceController = require("../controllers/resourceController");

const resourceRouter = express.Router();

resourceRouter.post("/", verifyToken, resourceController.createResource);
resourceRouter.get("/", resourceController.getAllResources);
resourceRouter.get("/:id", resourceController.getResourceById);
resourceRouter.put("/:id", verifyToken, resourceController.updateResource);
resourceRouter.delete("/:id", verifyToken, resourceController.deleteResource);

module.exports = resourceRouter;
