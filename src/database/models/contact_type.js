module.exports = (sequelize, Sequelize) => {
    const Contact_type = sequelize.define('Contact_type', {
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
      modelName: 'Contact_type',
      timestamps:false
    });
    Contact_type.associate = models => {
        Contact_type.belongsTo(models.Call, {foreignKey: models.Call.id});
    };
    return Contact_type;
  };
  