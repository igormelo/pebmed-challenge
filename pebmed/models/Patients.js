const { Model, DataTypes } = require('sequelize');

class Patients extends Model {
    static init(sequelize) {
        super.init({
            name:  DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            birthday: DataTypes.DATE,
            gender: DataTypes.STRING,
            height: DataTypes.DECIMAL,
            weight: DataTypes.DECIMAL
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.hasMany(models.Notes, { foreignKey: 'patient_id', as: 'notes' });
        this.hasMany(models.Schedules, { foreignKey: 'patient_id', as: 'schedules' })
      }
}
module.exports = Patients;