const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createTeam,
  getTeams,
  getMyTeams,
} = require("../controllers/teamController");

router.post("/", createTeam);
router.get("/", getTeams);
router.get("/my-teams", protect, getMyTeams);

module.exports = router;