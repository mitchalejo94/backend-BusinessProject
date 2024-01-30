const express = require("express");
const router = express.Router();
const { AdminUsers } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//POST - Only admin User.
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      AdminUsers.create({
        username: username,
        password: hash,
      });
    });
    // await AdminUsers.create(postAdminUser);
    res.json("success");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login Route

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const adminUser = await AdminUsers.findOne({
      where: { username: username },
    });

    if (!adminUser) {
      return res.status(404).json({ error: "AdminUser doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, adminUser.password);

    if (!passwordMatch)
      return res
        .status(401)
        .json({ error: "Wrong username and password combination" });

    const accessToken = sign(
      {
        username: adminUser.username,
        id: adminUser.id,
      },
      "shhsecret"
    );

    res.json(accessToken);

    // Passwords match - successful login
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
