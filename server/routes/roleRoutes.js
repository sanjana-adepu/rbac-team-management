const express = require("express");
const router = express.Router();

const {
  createRole,
  getRoles,
  assignPermissionsToRole,
} = require("../controllers/roleController");

// Create role
router.post("/", createRole);

// Get roles
router.get("/", getRoles);

// Assign permissions
router.put("/:roleId/permissions", assignPermissionsToRole);

module.exports = router;