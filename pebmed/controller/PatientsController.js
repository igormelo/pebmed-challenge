const Patients = require('../models/Patients');
const validator = require("../middlewares/validate");
const patientsRepository = require('../repositories/PatientRepository');
const { update } = require('../models/Patients');

module.exports = {
    async request(req, res) {
        try {
            let response = await patientsRepository.request();

            res.json(response);
        } catch (e) {
            res.status(500).send({ message: 'Check the logs' })
        }
    },
    async requestById(req, res) {
        var id = req.params.id;
        try {
            let response = await patientsRepository.requestById(id)

            if (!response) {
                res.status(500).send({ message: 'Patient not found' })
            }
            res.json(response);

        } catch (e) {
            res.status(500).send({ message: 'Check the logs' });
        }
    },
    async create(req, res) {

        var { name, phone, email, birthday, gender, height, weight } = req.body;

        let rules = {
            name: "required|string",
            phone: "required|string",
            email: "required|email",
            birthday: "required|date",
            gender: "required|string",
            height: "required|numeric",
            weight: "required|numeric",
        };
        var data = { name, phone, email, birthday, gender, height, weight }

        validator(req.body, rules, {}, async (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: "Validation failed",
                    data: err
                })
            } else {
                try {
                    let response = await patientsRepository.create(data);

                    if (!response) {
                        res.status(500).send({ message: "Patient Already exists" })
                    }
                    res.json({ message: response });
                } catch (e) {

                    res.status(500).send({ message: 'Error check the logs' });
                }
            }
        })
    },
    async update(req, res) {
        var id = req.params.id
        var { name, phone, email, birthday, gender, height, weight } = req.body;

        let rules = {
            name: "required|string",
            phone: "required|string",
            email: "required|email",
            birthday: "required|date",
            gender: "required|string",
            height: "required|numeric",
            weight: "required|numeric",
        }
        var data = { name, phone, email, birthday, gender, height, weight };

        validator(req.body, rules, {}, async (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: "Validation failed",
                    data: err
                })
            } else {
                try {
                    let response = await patientsRepository.update(data, id);

                    if (!response) {
                        res.status(402).send({ message: "Patient not exists" })
                    }
                    res.json({ message: 'Updated patient' });
                } catch (e) {

                    res.status(500).send({ message: 'Error check the logs' });
                }
            }
        })
    },
    async delete(req, res) {
        var id = req.params.id;
        try {
            let response = await patientsRepository.delete(id)

            if (!response) {
                res.status(400).json({ error: 'Patient not found' })
            }
            return res.json({ message: 'Deleted' })
        } catch (e) {

        }
    }
}