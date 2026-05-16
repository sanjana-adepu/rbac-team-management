const Membership = require("../models/Membership");
const Task = require("../models/Task"); 

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user._id; // from auth middleware
      let teamId = req.body?.teamId || req.query?.teamId;

      // for update and delete tasks
      if (!teamId && req.params?.taskId) {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }

        teamId = task.team;
      }

      if (!teamId) {
        return res.status(400).json({ message: "Team ID required" });
      }

      req.teamId = teamId;

      const membership = await Membership.findOne({
        user: userId,
        team: teamId,
      }).populate({
        path: "role",
        populate: {
          path: "permissions",
        },
      });

      if (!membership) {
        return res.status(403).json({ message: "No role in this team" });
      }

      const permissions = membership.role.permissions.map((p) => p.name);

      if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = checkPermission;