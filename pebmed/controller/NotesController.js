const { create } = require('../models/Notes');
const notesRepository = require('../repositories/NotesRepository');
module.exports = {
    async request(req, res) {
        const { patient_id } = req.params;
        try {
            const patient = await notesRepository.request(patient_id);

            if (!patient) {
                res.status(500).send({ message: 'Patient not found' })
            }
            if (patient.notes.length == 0) {
                res.status(500).send({message: "No notes to patient"})
            }
            res.json(patient.notes);
        } catch (e) {
            res.status(500).send({message: 'Error: check the logs'})
        }
    },
    async create(req, res) {
        const { patient_id } = req.params;
        const { consultation_date, message } = req.body
        const data = { consultation_date, message }
        try {
            const patient = await notesRepository.request(patient_id);

            if (!patient) {
                res.status(500).json({error: 'Patient not found'})
            }
            const notes = await notesRepository.create(data, patient_id);
            res.json(notes);
        } catch (e) {
            res.status(500).send({message: 'Error: check the logs'})
        }
    }
}