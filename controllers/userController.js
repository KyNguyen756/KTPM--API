const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
      const { username, password, birthDate, role } = req.body; 
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        password: hashedPassword,
        birthDate,
        role: role || "client", 
      });
  
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).send(error);
    }
  };

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};
