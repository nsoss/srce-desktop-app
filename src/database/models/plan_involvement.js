module.exports = (sequelize, Sequelize) => {
    const Plan_involvement = sequelize.define('Plan_involvement', {
        plan_involvement_id: {
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
      modelName: 'Plan_involvement',
      timestamps:false
    });
    Plan_involvement.associate = models => {
        Plan_involvement.belongsTo(models.Caller, {foreignKey: models.Caller.caller_id});
    };
    return Plan_involvement;
  };
  