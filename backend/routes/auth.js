import { login, getMyProfile } from "../controllers/auth.js";
const express = require("express");

const router = express.Router();

// router.get("/me", verifySession, getMyProfile);
router.post('/login', login);

module.exports = router;
export default router;