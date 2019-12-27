module.exports = (sequelize, Sequelize) => {
    const Suicide_factor = sequelize.define('Suicide_factor', {
        suicide_factor_id:  {
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
      modelName: 'Suicide_factor',
      timestamps:false
    });
    Suicide_factor.associate = models => {
        Suicide_factor.belongsTo(models.Call_description, {foreignKey: models.Call_description.call_description_id});
    };
    return Suicide_factor;
  };
