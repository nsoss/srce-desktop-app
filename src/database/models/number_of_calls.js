module.exports = (sequelize, Sequelize) => {
    const Number_of_calls = sequelize.define(
        'Number_of_calls',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            }
        },
        {
            sequelize,
            modelName: 'Number_of_calls',
            timestamps: false
        }
    );
    Number_of_calls.associate = models => {
        Number_of_calls.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Number_of_calls;
};
