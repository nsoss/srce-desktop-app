module.exports = (sequelize, Sequelize) => {
    const Volunteer = sequelize.define(
        'Volunteer',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                default: new Date(),
            },
        },
        {
            sequelize,
            modelName: 'Volunteer',
            timestamps: false,
        }
    );
    Volunteer.associate = models => {
        Volunteer.belongsTo(models.Call, { foreignKey: models.Call.id });
    };
    return Volunteer;
};
