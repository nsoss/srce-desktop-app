module.exports = (sequelize, Sequelize) => {
  const Call = sequelize.define('Call', {
    call_id: {
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
  }, {
    sequelize,
    modelName: 'Call',
    timestamps: false
  });
  return Call;
};


