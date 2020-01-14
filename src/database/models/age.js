module.exports = (sequelize, Sequelize) => {
    const Age = sequelize.define('Age', {
      id:  {
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
      modelName: 'Age',
      timestamps:false
    });
    Age.associate = models => {
      Age.belongsTo(models.Call, {foreignKey: models.Call.id});
    };
    return Age;
  };
  