module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Volunteers', {
        volunteer_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: { 
          type: Sequelize.DATE,
          allowNull: false,
          default: new Date()
        }
      },
      {
        sequelize,
        modelName: 'Volunteer',
        timestamps: false
    });
}
