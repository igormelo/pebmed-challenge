const { create } = require('../models/Notes');
const Notes = require('../models/Notes');
const Patients = require('../models/Patients');

module.exports = {

    async request(patient_id) {
        
        const patients = await Patients.findByPk(patient_id, {
            include: {association: 'notes'},
        });

        if (!patients) {
            return false;
        }
        return patients;

    },
    async create(data, patient_id) {
        const notes = await Notes.create({
            consultation_date: data.consultation_date,
            message: data.message,
            patient_id: patient_id
        })
        return notes;
    }
}
