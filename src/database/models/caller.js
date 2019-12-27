module.exports = (sequelize, Sequelize) => {
    const Caller = sequelize.define('Caller', {
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
    }, {
      sequelize,
      modelName: 'Caller',
      timestamps: false
    });
    return Caller;
  };
  
  