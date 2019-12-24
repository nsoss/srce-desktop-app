'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Calls', [{
        call_id: 1,
        created_at: new Date()
      },
      {
        call_id: 2,
        created_at: new Date()
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Calls', null, {});
    
  }
};
