module.exports = (sequelize, Sequelize) => {
    const Marital_status = sequelize.define('Marital_status', {
        marital_status_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        }
    }, {
      sequelize,
      modelName: 'Marital_status',
      timestamps:false
    });
    Marital_status.associate = models => {
        Marital_status.belongsTo(models.Caller, {foreignKey: models.Caller.caller_id});
    };
    return Marital_status;
  };
  