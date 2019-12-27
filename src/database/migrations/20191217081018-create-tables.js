'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    return [
    await queryInterface.createTable('Calls', {
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
      call_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      volunteer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Volunteers',
            key: 'volunteer_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      contact_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey:true,
          references:{
            model: "Contact_type",
            key: "contact_type_id",
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      call_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Call_type",
          key: "call_type_id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      call_description_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: "Call_description",
            key: "call_description_id",
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      caller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Caller',
            key: 'caller_id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      }
    }),
    await queryInterface.createTable('Contact_types', {
      contact_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable("Volunteers", {
      volunteer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: { 
        type: Sequelize.DATE,
        allowNull: false
      }
    }),
    await queryInterface.createTable('Call_types', {
      call_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Call_descriptions', {
      call_description_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      problem_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Problem_type',
            key: 'problem_type_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      suicide_risk_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Suicide_risk',
            key: 'suicide_risk_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      suicide_factor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Suicide_factor',
            key: 'suicide_factor_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      call_resolution_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Call_resolution_type',
            key: 'call_resolution_type_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      note: {
        type: Sequelize.STRING
      },
      short_content: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Problem_types', {
      problem_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Suicide_risks', {
      suicide_risk_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Suicide_factors', {
      suicide_factor_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Call_resolution_types', {
      call_resolution_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Callers', {
      caller_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Gender',
          key: 'gender_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      age_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Age',
          key: 'age_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      marital_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Marital_status',
          key: 'marital_status_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      number_of_calls_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Number_of_calls',
          key: 'number_of_calls_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      plan_involvement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Plan_involvement',
          key: 'plan_involvement_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    }),
    await queryInterface.createTable('Genders', {
      gender_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Marital_statuses', {
      marital_status_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Number_of_calls', {
      number_of_calls_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    }),
    await queryInterface.createTable('Plan_involvements', {
      plan_involvement_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    })   
  ];
  },
  
  down: async (queryInterface, Sequelize) => {
    return [await queryInterface.dropTable('Calls'), 
            await queryInterface.dropTable('Contact_types'),
            await queryInterface.dropTable('Volunteers'),
            await queryInterface.dropTable('Call_types'),
            await queryInterface.dropTable('Call_descriptions'),
            await queryInterface.dropTable('Problem_types'),
            await queryInterface.dropTable('Suicide_risks'),
            await queryInterface.dropTable('Suicide_factors'),
            await queryInterface.dropTable('End_of_call_states'),
            await queryInterface.dropTable('Callers'),
            await queryInterface.dropTable('Genders'),
            await queryInterface.dropTable('Marital_statuses'),
            await queryInterface.dropTable('Number_of_calls'),
            await queryInterface.dropTable('Plan_involvements')];
  }
};
