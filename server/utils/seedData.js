const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Team = require("../models/Team");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const Membership = require("../models/Membership");

const seedData = async () => {
  try {
    console.log("Clearing old data...");

    await Promise.all([
      User.deleteMany(),
      Team.deleteMany(),
      Role.deleteMany(),
      Permission.deleteMany(),
      Membership.deleteMany(),
    ]);

    console.log("Old data deleted");

    const password = await bcrypt.hash("123456", 10);

    const permissions = await Permission.insertMany([
      { name: "CREATE_TASK" },
      { name: "EDIT_TASK" },
      { name: "DELETE_TASK" },
      { name: "VIEW_ONLY" },

      { name: "CREATE_USER" },
      { name: "EDIT_USER" },
      { name: "DELETE_USER" },
      { name: "VIEW_USER" },
    ]);

    const permMap = {};
    permissions.forEach((p) => {
      permMap[p.name] = p._id;
    });

    const roles = await Role.insertMany([
      {
        name: "Admin",
        permissions: Object.values(permMap), // all 8
      },
      {
        name: "Manager",
        permissions: [
          permMap.CREATE_TASK,
          permMap.EDIT_TASK,
          permMap.DELETE_TASK,
          permMap.VIEW_ONLY,
        ],
      },
      {
        name: "Viewer",
        permissions: [permMap.VIEW_ONLY],
      },
    ]);

    const roleMap = {};
    roles.forEach((r) => {
      roleMap[r.name] = r._id;
    });

    const users = await User.insertMany([
      { name: "Alice", email: "alice@test.com", password },
      { name: "Bob", email: "bob@test.com", password },
      { name: "Charlie", email: "charlie@test.com", password },
      { name: "David", email: "david@test.com", password },
      { name: "Eve", email: "eve@test.com", password },

      { name: "NoTeam1", email: "not1@test.com", password },
      { name: "NoTeam2", email: "not2@test.com", password },
    ]);

    const userMap = {};
    users.forEach((u) => {
      userMap[u.name] = u._id;
    });


    const teams = await Team.insertMany([
      { name: "Alpha" },
      { name: "Beta" },
      { name: "Gamma" },
      { name: "Delta" },
    ]);

    const teamMap = {};
    teams.forEach((t) => {
      teamMap[t.name] = t._id;
    });


    await Membership.insertMany([
      {
        user: userMap.Alice,
        team: teamMap.Alpha,
        role: roleMap.Admin,
      },

      {
        user: userMap.Alice,
        team: teamMap.Beta,
        role: roleMap.Viewer,
      },

      {
        user: userMap.Bob,
        team: teamMap.Alpha,
        role: roleMap.Manager,
      },

      {
        user: userMap.Bob,
        team: teamMap.Gamma,
        role: roleMap.Viewer,
      },

      {
        user: userMap.Charlie,
        team: teamMap.Alpha,
        role: roleMap.Viewer,
      },

      {
        user: userMap.David,
        team: teamMap.Delta,
        role: roleMap.Manager,
      },

      {
        user: userMap.Eve,
        team: teamMap.Gamma,
        role: roleMap.Admin,
      },
    ]);

    console.log("Seed data created successfully!");
    console.log("Login password for all users: 123456");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = seedData;