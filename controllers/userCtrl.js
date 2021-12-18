const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  //register end point
  register: async (req, res) => {
    try {
      //storing value of client side
      const { name, email, password } = req.body;
      //check if user already exist in database
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email is already in user." });
      // password should be more than 6 char
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "password should be at least 7 character" });

      //password bcrypt
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      //saving user in database
      await newUser.save();
      //create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ msg: accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
