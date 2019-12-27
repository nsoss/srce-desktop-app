module.exports = (sequelize, Sequelize) => {
    const Age = sequelize.define('Age', {
      age_id:  {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: Sequelize.STRING,
        allowNull:false
     }
    }, {
      sequelize,
      modelName: 'Age',
      timestamps:false
    });
    Age.associate = models => {
      Age.belongsTo(models.Caller, {foreignKey: models.Caller.caller_id});
    };
    return Age;
  };
  