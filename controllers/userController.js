const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  updateUserValidation,
  handleValidationResults,
} = require("../validations/userValidations");

const db = require("../models");
const User = db.users;

// Sign up
const signUp = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
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

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
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

module.exports = {
  signUp,
  logIn,
  updateUser,
  deleteUser,
};
