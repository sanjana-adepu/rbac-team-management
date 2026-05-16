const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Team = require("../models/Team");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const Membership = require("../models/Membership");
const Task = require("../models/Task");

const seedData = async () => {
  try {
    console.log("Clearing old data...");

    await Promise.all([
      User.deleteMany(),
      Team.deleteMany(),
      Role.deleteMany(),
      Permission.deleteMany(),
      Membership.deleteMany(),
      Task.deleteMany(),
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
        permissions: Object.values(permMap),
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

    const usersData = [];
    for (let i = 1; i <= 15; i++) {
      usersData.push({
        name: `User${i}`,
        email: `user${i}@test.com`,
        password,
      });
    }

    const users = await User.insertMany(usersData);

    const userMap = {};
    users.forEach((u) => {
      userMap[u.email] = u._id;
    });

    const teams = await Team.insertMany([
      { name: "Frontend Team" },
      { name: "Backend Team" },
      { name: "Data Modelling Team" },
      { name: "Design Team" },
      { name: "PR Team" },
    ]);

    const teamMap = {};
    teams.forEach((t) => {
      teamMap[t.name] = t._id;
    });

    await Membership.insertMany([
      // Frontend
      { user: userMap["user1@test.com"], team: teamMap["Frontend Team"], role: roleMap.Admin },
      { user: userMap["user2@test.com"], team: teamMap["Frontend Team"], role: roleMap.Manager },
      { user: userMap["user3@test.com"], team: teamMap["Frontend Team"], role: roleMap.Viewer },

      // Backend
      { user: userMap["user4@test.com"], team: teamMap["Backend Team"], role: roleMap.Admin },
      { user: userMap["user5@test.com"], team: teamMap["Backend Team"], role: roleMap.Manager },
      { user: userMap["user6@test.com"], team: teamMap["Backend Team"], role: roleMap.Viewer },

      // Data
      { user: userMap["user7@test.com"], team: teamMap["Data Modelling Team"], role: roleMap.Manager },
      { user: userMap["user8@test.com"], team: teamMap["Data Modelling Team"], role: roleMap.Viewer },

      // Design
      { user: userMap["user9@test.com"], team: teamMap["Design Team"], role: roleMap.Admin },
      { user: userMap["user10@test.com"], team: teamMap["Design Team"], role: roleMap.Viewer },

      // PR
      { user: userMap["user11@test.com"], team: teamMap["PR Team"], role: roleMap.Manager },
      { user: userMap["user12@test.com"], team: teamMap["PR Team"], role: roleMap.Viewer },

      // Multi-team
      { user: userMap["user13@test.com"], team: teamMap["Frontend Team"], role: roleMap.Viewer },
      { user: userMap["user13@test.com"], team: teamMap["Backend Team"], role: roleMap.Viewer },

    ]);

    await Task.insertMany([
      {
        title: "Build UI components",
        team: teamMap["Frontend Team"],
        createdBy: userMap["user1@test.com"],
      },
      {
        title: "Fix navbar bug",
        team: teamMap["Frontend Team"],
        createdBy: userMap["user2@test.com"],
      },
      {
        title: "Setup API routes",
        team: teamMap["Backend Team"],
        createdBy: userMap["user4@test.com"],
      },
      {
        title: "Optimize DB queries",
        team: teamMap["Backend Team"],
        createdBy: userMap["user5@test.com"],
      },
      {
        title: "Design schema",
        team: teamMap["Data Modelling Team"],
        createdBy: userMap["user7@test.com"],
      },
      {
        title: "Create UI mockups",
        team: teamMap["Design Team"],
        createdBy: userMap["user9@test.com"],
      },
      {
        title: "Prepare release notes",
        team: teamMap["PR Team"],
        createdBy: userMap["user11@test.com"],
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