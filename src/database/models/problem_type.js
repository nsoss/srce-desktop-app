module.exports = (sequelize, Sequelize) => {
    const Problem_type = sequelize.define('Problem_type', {
        problem_type_id:  {
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
      modelName: 'Problem_type',
      timestamps:false
    });
    Problem_type.associate = models => {
        Problem_type.belongsTo(models.Call_description, {foreignKey: models.Call_description.call_description_id});
    };
    return Problem_type;
  };
