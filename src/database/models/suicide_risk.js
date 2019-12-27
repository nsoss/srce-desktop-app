module.exports = (sequelize, Sequelize) => {
    const Suicide_risk = sequelize.define('Suicide_risk', {
        suicide_risk_id:  {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
     }
    }, {
      sequelize,
      modelName: 'Suicide_risk',
      timestamps:false
    });
    Suicide_risk.associate = models => {
        Suicide_risk.belongsTo(models.Call_description, {foreignKey: models.Call_description.call_description_id});
    };
    return Suicide_risk;
  };
