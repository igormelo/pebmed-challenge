const scheduleRepository = require("../repositories/ScheduleRepository");
const validator = require("../middlewares/validate");
const { Op } = require("sequelize");
const PatientRepository = require("../repositories/PatientRepository");
const ScheduleRepository = require("../repositories/ScheduleRepository");
const Patients = require("../models/Patients");
const Schedules = require("../models/Schedules");

module.exports = {
    async request(req, res) {
        const { patient_id } = req.params;
        try {
            const patient = await PatientRepository.requestById(patient_id)
            if (!patient) {
                res.status(500).send({ message: 'Patient not found' })
            }
            if (patient.schedules.length == 0) {
                res.status(500).send({ message: "No schedules to patient" })
            }
            res.json(patient.schedules);
        } catch (e) {
            res.status(500).send({ message: 'Error: check the logs' })
        }
    },
    async create(req, res) {
        const { patient_id, doctor_id, scheduling_date } = req.body
        let rules = {
            patient_id: "required|integer",
            doctor_id: "required|integer",
            scheduling_date: "required|date",
        };
        const data = { patient_id, doctor_id, scheduling_date };

        validator(req.body, rules, {}, async (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: "Validation failed",
                    data: err,
                });
            }
            else {

                let hour = scheduling_date.substring(11, 13);
                let date = scheduling_date.substring(0, 10);

                let dateObj = { hour, date };

                try {
                    let response = await scheduleRepository.request(dateObj)

                    console.log(response);

                    if (!response) {
                        return res.status(500).send({
                            message: "Scheduling already exists",
                            statusCode: 500
                        });
                    }
                    let schedule = await scheduleRepository.create(data)

                    res.json(schedule);
                } catch (e) {
                    res.status(500).send({ message: "Error: Check the logs" })
                }

            }
        })
    },
    async update(req, res) {
        const { id } = req.params;
        const { patient_id } = req.params;
        const { scheduling_date } = req.body;

        let rules = {
            scheduling_date: "required|date",
        };

        const data = { id, patient_id, scheduling_date };
        validator(req.body, rules, {}, async (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: "Validation failed",
                    data: err,
                });
            } else {
                try {
                    const patient = await PatientRepository.requestById(patient_id)

                    if (!patient) {
                        res.status(400).send({
                            message: 'Patient not found',
                            statusCode: 400
                        })
                    }

                    if (patient.schedules.length == 0) {
                        res.status(400).send({
                            message: 'There are no appointments for this patient',
                            statusCode: 400
                        });
                    }

                    let hour = scheduling_date.substring(11, 13);
                    let date = scheduling_date.substring(0, 10);

                    let dateObj = { hour, date };

                    const response = await ScheduleRepository.request(dateObj);

                    if (!response) {
                        res.status(500).send({ message: 'Schedule already exists to patient' })
                    } else {
                        const schedule = await ScheduleRepository.update(data)
                        res.json({ message: 'Scheduling date updated' });
                    }

                } catch (e) {
                    res.status(500).send({ message: 'Error check the logs' });
                }
            }
        })
    },
    async delete(req, res) {
        const { id } = req.params;
        const { patient_id } = req.params;

        try {
            const patient = await PatientRepository.requestById(patient_id);

            if (!patient) {
                res.status(400).send({
                    message: 'Patient not found',
                    statusCode: 400
                })
            }

            const schedule = await scheduleRepository.requestById(id, patient_id)
            if (!schedule) {
                res.status(400).send({ message: 'There is no appointment for this patient' });
            }

            const response = await scheduleRepository.delete(patient_id, id)

            res.status(200).send({ message: 'Schedule successfully deleted' })
        } catch (e) {
            res.status(500).send({ message: 'Error check the logs' });
        }


    }
}