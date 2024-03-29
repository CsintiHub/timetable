"use strict";
const models = require("../models");
const { User } = models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await User.create({
      name: "Gipsz Jakab",
      email: "gj@",
      tutor: false,
      subject: "",
      password: "titok",
    });
    await User.create({
      name: "Teszt Elek",
      email: "te@",
      tutor: true,
      subject: "Biology",
      password: "titok",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
