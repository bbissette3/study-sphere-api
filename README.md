Study Sphere API

This is the backend API for the Study Sphere application. It is built using Node.js, Express, Sequelize, and PostgreSQL, following the Model-View-Controller (MVC) design pattern.

front end repo -> https://github.com/bbissette3/study-sphere

Features

User authentication and authorization using JWT (JSON Web Tokens)
CRUD operations for managing topics, comments, resources, and user-topic relationships
Focus session tracking for users to log their learning progress
Integration with a PostgreSQL database for data persistence

Prerequisites

Before running the API, make sure you have the following installed:

Node.js (v12 or higher)
PostgreSQL database

API Endpoints

The following API endpoints are available:

Authentication:

POST /api/auth/signup: Create a new user account.
POST /api/auth/signin: Authenticate and generate a JWT token.
Topics:

GET /api/topics: Get all topics.
GET /api/topics/:id: Get a specific topic by ID.
POST /api/topics: Create a new topic.
PUT /api/topics/:id: Update a topic.
DELETE /api/topics/:id: Delete a topic.

Comments:

GET /api/comments: Get all comments.
GET /api/comments/:id: Get a specific comment by ID.
POST /api/comments: Create a new comment.
PUT /api/comments/:id: Update a comment.
DELETE /api/comments/:id: Delete a comment.

Resources:

GET /api/resources: Get all resources.
GET /api/resources/:id: Get a specific resource by ID.
POST /api/resources: Create a new resource.
PUT /api/resources/:id: Update a resource.
DELETE /api/resources/:id: Delete a resource.

User Topics:

GET /api/users/:userId/topics: Get all topics associated with a specific user.
POST /api/users/:userId/topics: Add a topic to a user's list.
DELETE /api/users/:userId/topics/:topicId: Remove a topic from a user's list.

Focus Sessions:

GET /api/focus-sessions: Get all focus sessions.
GET /api/focus-sessions/:id: Get a specific focus session by ID.
POST /api/focus-sessions: Create a new focus session.
PUT /api/focus-sessions/:id: Update a focus session.
DELETE /api/focus-sessions/:id: Delete a focus session.
