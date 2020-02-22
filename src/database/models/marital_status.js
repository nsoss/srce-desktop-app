module.exports = (sequelize, Sequelize) => {
    const Marital_status = sequelize.define(
        'Marital_status',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Marital_status',
            timestamps: false,
        }
    );
    Marital_status.associate = models => {
        Marital_status.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Marital_status;
};
