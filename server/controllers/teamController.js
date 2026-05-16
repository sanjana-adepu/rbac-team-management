const Team = require("../models/Team");
const Membership = require("../models/Membership");

// Create team
const createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    const team = await Team.create({ name });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyTeams = async (req, res) => {
  try {
    const userId = req.user._id;

    const memberships = await Membership.find({ user: userId })
      .populate("team");

    const teams = memberships.map((m) => m.team);

    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTeam, getTeams, getMyTeams };