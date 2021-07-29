const { response } = require('express');
const { request, requestById } = require('../controller/PatientsController');
const { update } = require('../models/Patients');
const Patients = require('../models/Patients');

module.exports = {
    async request() {
        const patients = await Patients.findAll();

        return patients;
    },
    async requestById(id) {
        const patient = await Patients.findByPk(id, {
            include: { association: 'schedules' }
        });
        if (!patient) {
            return false;
        }
        return patient;
    },
    async create(data) {
        const patientExists = await Patients.findAll({
            where: {
                'email': data.email
            }
        })

        if (patientExists.length > 0) {
            return false;
        }
        const patient = await Patients.create({
            name: data.name,
            phone: data.phone,
            email: data.email,
            birthday: data.birthday,
            gender: data.gender,
            height: data.height,
            weight: data.weight
        })
        return patient;
    },
    async update(data, id) {

        const patientExists = await Patients.findByPk(id);

        if (patientExists == null) {
            return false;
        }
        const patient = await Patients.update({
            name: data.name,
            phone: data.phone,
            email: data.email,
            birthday: data.birthday,
            gender: data.gender,
            height: data.height,
            weight: data.weight
        },
            {
                where: { id: id }
            }
        )
        return patient;
    },
    async delete(id) {
        const patientExists = await Patients.findByPk(id);
        if (patientExists == null) {
            return false;
        }
        const patient = await Patients.destroy({
            where: {
                id: id
            }
        })
        return patient;
    }
}