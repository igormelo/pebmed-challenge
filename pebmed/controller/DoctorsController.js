const { create, update } = require('../models/Doctors');
const crypto = require("crypto");
const validator = require("../middlewares/validate");
const doctorsRepository = require('../repositories/DoctorRepository');

module.exports = {
    async create(req, res) {

        var { name, lastname, login, password } = req.body;
        let rules = {
            name: "required|string",
            lastname: "required|string",
            login: "required|email",
            password: "required|string",
        };
        password = crypto.createHash("sha256").update(password).digest("hex");
        const data = { name, lastname, login, password }

        validator(req.body, rules, {}, async (err, status) => {
            if (!status) {
                res.status(412).send({
                    success: false,
                    message: "Validation failed",
                    data: err
                })
            } else {
                try {
                    let response = await doctorsRepository.execute(data);

                    if (!response) {
                        res.status(500).send({
                            message: "Doctors Already exists"
                        })
                    }
                    res.status(200).json(response)
                } catch (e) {
                    res.status(500).send({ 
                        message: 'Error check the logs' 
                    });
                }
            }
        })
    },
    async update(req, res) {
        var { name, lastname, login, password } = req.body;
        try {
            let response = await DoctorRepository.update({
                name,
                lastname,
                login,
                password
            })
            console.log(response);
            if (!response) {

            }
            return res.json({ message: 'Refreshed' })
        } catch (e) {

        }
    }
}