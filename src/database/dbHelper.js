const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbName = '/srce.db';
const pathToDatabase = path.join(__dirname, dbName);
const DBHelper = require('./dbHelper');
const Sequelize = require('sequelize');

const VolunteerModel = require('./models/volunteer');
const CallModel = require('./models/call');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: pathToDatabase
});

function testConnection() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            if (!fs.existsSync(pathToDatabase)) {
                console.log('Connection will be created.');
                DBHelper.checkIfDatabaseExists();
            } else {
                console.error('Unable to connect to the database:', err);
            }
        });
}

exports.checkIfDatabaseExists = () => {
    fs.access(pathToDatabase, fs.F_OK, e => {
        if (e) {
            createDatabase();
        } else {
            console.log('Already created db srce.');
            testConnection();
        }
    });
};

function createDatabase() {
    // eslint-disable-next-line no-unused-vars
    const db = new sqlite3.Database(pathToDatabase, e => {
        if (e) {
            console.error(e.message);
        } else {
            console.log('Created new db!');
        }
    });
}

const volunteer = VolunteerModel(sequelize, Sequelize);
const call = CallModel(sequelize, Sequelize);

sequelize.sync()


exports.getVolunteers = () => {
    const rows = volunteer
        .findAll({
            attributes: ['volunteer_id', 'first_name', 'last_name', 'created_at'],
            raw: true
        })
        .then(volunteers => {
            return volunteers;
        });
    return rows;
};


exports.deleteVolunteer = id => {
    const isDeleted = volunteer.destroy({
        where: { volunteer_id: id }
    }).then(console.log('Deleted volunteer with id: ' + id));
    return isDeleted;
};

exports.insertVolunteer = v => {
    const insertedID = volunteer.create(v).then(row => {
        return row.dataValues.volunteer_id;
    });
    return insertedID;
};

exports.getCalls = () => {
    const rows = call
        .findAll({
            attributes: ['call_id', 'created_at', 'volunteerId'],
            raw: true
        })
        .then(calls => {
            return calls;
        });
    return rows;
}

exports.deleteCall = id => {
    const isDeleted = call.destroy({
        where: { call_id: id }
    }).then(console.log('Deleted call with id: ' + id));
    return isDeleted;
}

exports.insertCall = c => {
    const insertedCall = call.create(c).then(row => {
        return row.dataValues.call_id;
    });
    return insertedCall;
};



