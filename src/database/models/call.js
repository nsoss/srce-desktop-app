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
  }, {
    sequelize,
    modelName: 'Call',
    timestamps: false
  });
  Call.associate = models => {
    Call.belongsTo(models.Volunteer, {foreignKey: models.Volunteer.volunteer_id});
  };
  return Call;
};