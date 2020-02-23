module.exports = (sequelize, Sequelize) => {
    const Suicide_factor = sequelize.define(
        'Suicide_factor',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Suicide_factor',
            timestamps: false,
        }
    );
    Suicide_factor.associate = models => {
        Suicide_factor.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Suicide_factor;
};
