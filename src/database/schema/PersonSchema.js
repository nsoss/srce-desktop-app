const EntitySchema = require('typeorm').EntitySchema;
const Person = require('../entity/Person').Person;

module.exports = new EntitySchema({
    name: 'Perosn',
    target: Person,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        firstName: {
            type: 'varchar',
            length: 50
        },
        lastName: {
            type: 'varchar',
            length: 50
        }
    }
});
