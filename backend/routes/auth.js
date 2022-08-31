var fetchuser = require('../middleware/fetchuser');
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "SexyCoders#@1";
const jwt = require("jsonwebtoken");

// ROUTE 1: Create a User Using: POST "/api/auth", doesn't require auth
router.post(
  "/createUser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if any error is found, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check if user with this email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with the email already exists" });
    }
    //bcrypt hasing
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    //Create new User
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  }
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// ROUTE 3: Get logged in User Details using: POST "/api/auth/getUser". Login Required
router.post(
  "/getUser",
  fetchuser,
  async (req, res) => {
    try {
      userId=req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);
module.exports = router;
