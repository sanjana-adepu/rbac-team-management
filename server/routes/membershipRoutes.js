const express = require("express");
const router = express.Router();

const {
  addUserToTeam,
  removeUserFromTeam,
  assignRole,
  getUserPermissions,
  getUserMemberships
} = require("../controllers/membershipController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", addUserToTeam);

router.delete("/remove", removeUserFromTeam);

router.post("/assign-role", assignRole);

router.get("/permissions", getUserPermissions);

router.get("/my-memberships", protect, getUserMemberships);

module.exports = router;