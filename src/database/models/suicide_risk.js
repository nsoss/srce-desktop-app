module.exports = (sequelize, Sequelize) => {
    const Suicide_risk = sequelize.define(
        'Suicide_risk',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Suicide_risk',
            timestamps: false
        }
    );
    Suicide_risk.associate = models => {
        Suicide_risk.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Suicide_risk;
};
