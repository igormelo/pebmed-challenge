const Patients = require("../models/Patients")
const Schedules = require("../models/Schedules");
const { Op } = require("sequelize");

module.exports = {
    async requestById(id, patient_id) {
        const schedule = await Schedules.findByPk(id, {
            where : {
                'patient_id': patient_id
            }
        })
        return schedule;
    },

    async request(dateObj) {

        const response = await Schedules.findAll({
            where: {
                "scheduling_date": {
                    [Op.between]: [
                        `${dateObj.date} ${dateObj.hour}`,
                        `${dateObj.date} ${dateObj.hour}:59:59`
                    ]
                }
            }
        });

        if (response.length > 0) {
            console.log("caiu aqui")
            return false;
        }
        return response;

    },

    async create(data) {

        const schedule = await Schedules.create({
            patient_id: data.patient_id,
            doctor_id: data.doctor_id,
            scheduling_date: data.scheduling_date
        })
        return schedule;

    },
    async update(data) {
        const schedule = await Schedules.update({
            scheduling_date: data.scheduling_date
        }, {
            where: {
                'patient_id': data.patient_id,
                'id': data.id
            }
        })
        return schedule;

    },
    async delete(patient_id, id) {
        const schedule = await Schedules.destroy({
            where : {
                'patient_id': patient_id,
                'id': id
            }
        })
        return schedule;

    }
}