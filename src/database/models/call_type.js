module.exports = (sequelize, Sequelize) => {
    const Call_type = sequelize.define(
        'Call_type',
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
            modelName: 'Call_type',
            timestamps: false
        }
    );
    Call_type.associate = models => {
        Call_type.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Call_type;
};
