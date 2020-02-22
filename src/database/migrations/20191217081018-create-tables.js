'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return [
            await queryInterface.createTable('Calls', {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                call_number: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                call_duration: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                volunteer_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Volunteers',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                contact_type_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Contact_types',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                call_type_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Call_types',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                problem_type_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Problem_types',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                suicide_risk_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Suicide_risks',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                suicide_factor_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Suicide_factors',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                call_resolution_type_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Call_resolution_types',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                note: {
                    type: Sequelize.STRING
                },
                short_content: {
                    type: Sequelize.STRING
                },
                caller_name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                age_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Ages',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                gender_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Genders',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                marital_status_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Marital_statuses',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                number_of_calls_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Number_of_calls',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                plan_involvement_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    references: {
                        model: 'Plan_involvements',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                }
            }),
            await queryInterface.createTable('Contact_types', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Volunteers', {
                id: {
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
                    allowNull: false
                }
            }),
            await queryInterface.createTable('Call_types', {
                id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Problem_types', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Ages', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Suicide_risks', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Suicide_factors', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Call_resolution_types', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Genders', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Marital_statuses', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Number_of_calls', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            }),
            await queryInterface.createTable('Plan_involvements', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING
                }
            })
        ];
    },

    down: async (queryInterface, Sequelize) => {
        return [
            await queryInterface.dropTable('Calls'),
            await queryInterface.dropTable('Contact_types'),
            await queryInterface.dropTable('Volunteers'),
            await queryInterface.dropTable('Call_types'),
            await queryInterface.dropTable('Problem_types'),
            await queryInterface.dropTable('Suicide_risks'),
            await queryInterface.dropTable('Suicide_factors'),
            await queryInterface.dropTable('End_of_call_states'),
            await queryInterface.dropTable('Genders'),
            await queryInterface.dropTable('Marital_statuses'),
            await queryInterface.dropTable('Number_of_calls'),
            await queryInterface.dropTable('Plan_involvements'),
            await queryInterface.dropTable('Call_resolution_types'),
            await queryInterface.dropTable('Ages')
        ];
    }
};
