const Patients = require('../models/Patients');
const validator = require("../middlewares/validate");
const patientsRepository = require('../repositories/PatientRepository');

module.exports = {
    async create(req, res) {
        let data = req.body;
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

        validator(req.body, rules, {}, async (err, status) => {
            if (!status) {
                req.status(412).send({
                    success: false,
                    message: "Validation failed",
                    data: err
                })
            } else {
                try {
                    let response = await patientsRepository.execute(data);

                    if (!response) {

                    }
                    res.json({message: response});
                } catch (e) {
                    console.log(e.message);
                    res.status(500).send({ message: 'Error check the logs' });
                }
            }
        })
    }
}