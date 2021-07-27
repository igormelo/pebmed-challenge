'use strict';
const crypto = require('crypto');
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let password = 'pebmedpass'
    
    password = crypto.createHash("sha256").update(password).digest("hex");
    return queryInterface.bulkInsert('doctors', [{
      name: 'admin',
      lastname: 'admin',
      login: 'admin@pebmed.com.br',
      password: password,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {

  }
};
