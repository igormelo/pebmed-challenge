const Sequelize = require('sequelize');
const db = require('../config/database');
const Schedules = require('../models/Schedules');
const Notes = require('../models/Notes');
const Doctors = require('../models/Doctors');
const Patients = require('../models/Patients');
const connection = new Sequelize(db);

Patients.init(connection);
Notes.init(connection);
Doctors.init(connection);
Schedules.init(connection);

Patients.associate(connection.models);
Notes.associate(connection.models);
Schedules.associate(connection.models);
Doctors.associate(connection.models);

module.exports = connection;