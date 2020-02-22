module.exports = (sequelize, Sequelize) => {
    const Call_resolution_type = sequelize.define(
        'Call_resolution_type',
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
            modelName: 'Call_resolution_type',
            timestamps: false,
        }
    );
    Call_resolution_type.associate = models => {
        Call_resolution_type.belongsTo(models.Call, {
            foreignKey: models.Call.id,
        });
    };
    return Call_resolution_type;
};
