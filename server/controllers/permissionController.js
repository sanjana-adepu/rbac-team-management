const Permission = require("../models/Permission");

const createPermission = async (req, res) => {
  try {
    const { name } = req.body;

    const permission = await Permission.create({ name });

    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPermission, getPermissions };