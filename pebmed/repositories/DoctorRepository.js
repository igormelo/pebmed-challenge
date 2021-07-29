const Doctors = require('../models/Doctors');
module.exports = {
    async execute(data) {

        const doctorsExists = await Doctors.findAll({
            where: {
                'login': data.login
            }
        })

        if (doctorsExists.length > 0) {
            return false;
        }
        const doctor = await Doctors.create({
            name: data.name,
            lastname: data.lastname,
            login: data.login,
            password: data.password
        })
        return doctor;
    },
    async update(data, id) {
        
        const doctorsIdExists = await Doctors.findByPk(id);

        if (!doctorsIdExists) {
            return false;
        }
        const doctor = await Doctors.update({
            name: data.name,
            lastname: data.lastname,
            login: data.login,
            password: data.password
        },
            {
                where: {id: id}
            }
        )
        return doctor;
    }
}