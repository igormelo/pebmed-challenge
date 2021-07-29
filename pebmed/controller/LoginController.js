const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const Doctors = require('../models/Doctors');
const validator = require("../middlewares/validate.js");
const DoctorRepository = require('../repositories/DoctorRepository');

const SECRET = "PebMED";

const login = async (req, res) => {
    var { login, password } = req.body;

    let rules = {
        login: "required|email",
        password: "required|string",
    };
    const data = { login, password };

    validator(req.body, rules, {}, async (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation Failed',
                data: err
            });
        } else {
            try {
                let response = await DoctorRepository.request(data)
   
                if (response.length == 0) {
                    return res.status(401).send("Forbidden");
                }
                let correctPass = response[0].password;

                if (correctPass === crypto.createHash("sha256").update(password).digest('hex')) {
                    const token = jwt.sign({ id: response[0].id }, SECRET, { expiresIn: 1440 });
                    return res.status(200).json({ token: token });
                }
            } catch (e) {
                res.status(500).send({ message: 'Error check the logs' });
            }
        }
    })
}
module.exports = login

