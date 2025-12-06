const express = require("express");
const router = express.Router();
const { alertReminder } = require("../controllers/checkReturn.js");

router.get('/', alertReminder)

module.exports = router;
