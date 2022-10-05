const express = require("express");
const router = express.Router();

const {
  signUp,
  logIn,
  verify,
} = require("../controllers/LoginSystem.controller");

router.post("/sign-up", signUp);
router.post("/sign-in", logIn);
router.post("/opt-verify", verify);

module.exports = router;
