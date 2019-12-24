'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Calls', {
      call_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
        
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      call_data: {
        type: Sequelize.STRING,
        allowNull: false
  
      },
      volunteerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Volunteers',
            key: 'volunteer_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      }

 
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Calls');
  }
};