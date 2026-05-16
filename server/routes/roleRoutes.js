const express = require("express");
const router = express.Router();

const {
  createRole,
  getRoles,
  assignPermissionsToRole,
} = require("../controllers/roleController");

router.post("/", createRole);

router.get("/", getRoles);

router.put("/:roleId/permissions", assignPermissionsToRole);

module.exports = router;