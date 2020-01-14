module.exports = (sequelize, Sequelize) => {
  const Call = sequelize.define('Call', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      default: new Date()
    },
    call_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    call_duration: {
      type: Sequelize.STRING,
      allowNull: false
    },
    volunteer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
        references: {
          model: 'Volunteer',
          key: 'id',
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
          key: "id",
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
        key: "id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    problem_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
        references: {
          model: 'Problem_type',
          key: 'id',
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
          key: 'id',
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
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    call_resolution_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey:true,
        references:{
          model: "Call_resolution_type",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    note: {
      type: Sequelize.STRING,
      allowNull: false
    },
    short_content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    caller_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Age',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    gender_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Gender',
        key: 'id',
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
        key: 'id',
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
        key: 'id',
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
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
  }, {
    sequelize,
    modelName: 'Call',
    timestamps: false
  });
  return Call;
};


