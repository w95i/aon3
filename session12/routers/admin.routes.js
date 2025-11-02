const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin } = require("../controllers/admin.controller");

router.post("/register", async (req, res) => {
  const result = await createAdmin(req.body);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  res.status(201).json({
    message: result.message,
    otp: result.otp,
    admin: result.admin,
  });
});

router.post("/login", async (req, res) => {
  const result = await loginAdmin(req.body);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  res.status(200).json({
    message: result.message,
    token: result.token,
  });
});

module.exports = router;
