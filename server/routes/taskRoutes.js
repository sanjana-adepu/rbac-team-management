const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

router.post(
  "/",
  protect,
  checkPermission("CREATE_TASK"),
  createTask
);

router.get(
  "/",
  protect,
  checkPermission("VIEW_ONLY"),
  getTasks
);

router.put(
  "/:taskId",
  protect,
  checkPermission("EDIT_TASK"),
  updateTask
);

router.delete(
  "/:taskId",
  protect,
  checkPermission("DELETE_TASK"),
  deleteTask
);

module.exports = router;