module.exports = (sequelize, Sequelize) => {
    const Gender = sequelize.define(
        'Gender',
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
            modelName: 'Gender',
            timestamps: false
        }
    );
    Gender.associate = models => {
        Gender.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Gender;
};
