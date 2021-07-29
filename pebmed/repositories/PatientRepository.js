const Patients = require('../models/Patients');

module.exports = {
    async execute(data) {

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
    }
}