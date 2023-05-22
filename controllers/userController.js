const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  updateUserValidation,
  handleValidationResults,
} = require("../validations/userValidations");

const db = require("../models");
const User = db.users;

//signup
const signUp = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // removed hashing
    });
    res.send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Log in
const logIn = async (req, res) => {
  // Check if User exists in the database
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    console.log(user);

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
        debug: "Password comparison failed", // Add this
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

// Update user
const updateUser = [
  updateUserValidation,
  handleValidationResults,
  async (req, res) => {
    try {
      const userId = req.userId;
      const updatedUser = await User.update(req.body, {
        where: { id: userId },
      });
      if (updatedUser[0] === 0) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(200).send({ message: "User updated" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
];

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    await User.destroy({ where: { id: userId } });
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//just added this to try persistent user
const verifyToken = async (req, res) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      console.log("Invalid token");
      return res.status(401).json({ message: "Invalid token" });
    }

    // Token is valid, get user details
    try {
      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        console.log("User not found");
        return res.status(404).send({ message: "User Not found." });
      }
      console.log("User found and response being sent");
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  });
};

module.exports = {
  signUp,
  logIn,
  updateUser,
  deleteUser,
  verifyToken,
};
