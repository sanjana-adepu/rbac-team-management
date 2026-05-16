const Membership = require("../models/Membership");

// Add user to team with role
const addUserToTeam = async (req, res) => {
  try {
    const { userId, teamId, roleId } = req.body;

    const membership = await Membership.create({
      user: userId,
      team: teamId,
      role: roleId,
    });

    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove user from team
const removeUserFromTeam = async (req, res) => {
  try {
    const { userId, teamId } = req.body;

    await Membership.findOneAndDelete({
      user: userId,
      team: teamId,
    });

    res.json({ message: "User removed from team" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign or update role
const assignRole = async (req, res) => {
  try {
    const { userId, teamId, roleId } = req.body;

    const membership = await Membership.findOneAndUpdate(
      { user: userId, team: teamId },
      { role: roleId },
      { new: true, upsert: true }
    );

    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPermissions = async (req, res) => {
  try {
    const { userId, teamId } = req.query;

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
      return res.json({ permissions: [] });
    }

    const permissions = membership.role.permissions;

    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMemberships = async (req, res) => {
  try {
    const userId = req.user._id;

    const memberships = await Membership.find({ user: userId })
      .populate("team")
      .populate({
        path: "role",
        populate: {
          path: "permissions",
        },
      });

    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addUserToTeam,
  removeUserFromTeam,
  assignRole,
  getUserPermissions,
  getUserMemberships,
};