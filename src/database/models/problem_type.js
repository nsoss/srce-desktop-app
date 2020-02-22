module.exports = (sequelize, Sequelize) => {
    const Problem_type = sequelize.define(
        'Problem_type',
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
            modelName: 'Problem_type',
            timestamps: false,
        }
    );
    Problem_type.associate = models => {
        Problem_type.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Problem_type;
};
