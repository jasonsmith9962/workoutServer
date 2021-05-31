const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:apex@localhost:5432/blog-post");

module.exports = sequelize;
