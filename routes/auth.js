const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const { login } = require("../controllers/auth");

router.post("/login", login);

module.exports = router;
