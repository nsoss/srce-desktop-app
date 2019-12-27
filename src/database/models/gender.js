module.exports = (sequelize, Sequelize) => {
    const Gender = sequelize.define('Gender', {
        gender_id: {
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
      modelName: 'Gender',
      timestamps:false
    });
    Gender.associate = models => {
        Gender.belongsTo(models.Caller, {foreignKey: models.Caller.caller_id});
    };
    return Gender;
  };
  