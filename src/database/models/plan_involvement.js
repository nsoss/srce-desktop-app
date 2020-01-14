module.exports = (sequelize, Sequelize) => {
    const Plan_involvement = sequelize.define('Plan_involvement', {
        id: {
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
        Plan_involvement.belongsTo(models.Call, {foreignKey: models.Call.id});
    };
    return Plan_involvement;
  };
  