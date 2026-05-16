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

// Add user to team
router.post("/add", addUserToTeam);

// Remove user
router.delete("/remove", removeUserFromTeam);

// Assign/update role
router.post("/assign-role", assignRole);

router.get("/permissions", getUserPermissions);

router.get("/my-memberships", protect, getUserMemberships);

module.exports = router;