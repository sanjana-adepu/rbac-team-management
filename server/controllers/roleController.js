const Role = require("../models/Role");

// Create role
const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    const role = await Role.create({
      name,
      permissions,
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign permissions to role
const assignPermissionsToRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;

    const role = await Role.findByIdAndUpdate(
      roleId,
      { permissions },
      { new: true }
    ).populate("permissions");

    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRole,
  getRoles,
  assignPermissionsToRole,
};