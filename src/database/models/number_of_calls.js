module.exports = (sequelize, Sequelize) => {
    const Number_of_calls = sequelize.define('Number_of_calls', {
        number_of_calls_id: {
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
      modelName: 'Number_of_calls',
      timestamps:false
    });
    Number_of_calls.associate = models => {
        Number_of_calls.belongsTo(models.Caller, {foreignKey: models.Caller.caller_id});
    };
    return Number_of_calls;
  };
  