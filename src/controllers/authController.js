const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signAccessToken} = require('../utils/jwt_helper');

exports.register = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exits" });
    }

    const user = new User({ name, email, password, department });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = await signAccessToken(user._id, user.role);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
