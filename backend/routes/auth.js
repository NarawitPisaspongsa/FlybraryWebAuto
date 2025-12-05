const login = require("../controllers/auth").login;
const express = require("express");

const router = express.Router();

// router.get("/me", verifySession, getMyProfile);
router.post('/login', login);

module.exports = router;