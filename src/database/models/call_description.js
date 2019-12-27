module.exports = (sequelize, Sequelize) => {
    const Call_description = sequelize.define('Call_description', {
      call_description_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
      },
      problem_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Problem_type',
            key: 'problem_type_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      suicide_risk_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Suicide_risk',
            key: 'suicide_risk_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      suicide_factor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
          references: {
            model: 'Suicide_factor',
            key: 'suicide_factor_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      call_resolution_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey:true,
          references:{
            model: "Call_resolution_type",
            key: "call_resolution_type_id",
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      note: {
        type: Sequelize.STRING,
        allowNull: false
      },
      short_content: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'Call_description',
      timestamps: false
    });
    Call_description.associate = models => {
      Call_description.belongsTo(models.Call, {foreignKey: models.Call.call_id});
    };
    return Call_description;
  };
  