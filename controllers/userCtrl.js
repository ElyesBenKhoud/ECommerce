const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

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
      res.json({ msg: "Register success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
