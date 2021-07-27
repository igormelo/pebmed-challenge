const { Model, DataTypes } = require('sequelize');

class Schedules extends Model {
    static init(sequelize) {
        super.init({
            scheduling_date: DataTypes.DATE,
        },
        {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.Patients, { foreignKey: 'patient_id', as: 'patient' });
        this.belongsTo(models.Doctors, { foreignKey: 'doctor_id', as: 'doctor' })
      }
}
module.exports = Schedules;