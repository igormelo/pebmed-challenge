const { Model, DataTypes } = require('sequelize');

class Notes extends Model {
    static init(sequelize) {
        super.init({
            consultation_date: DataTypes.DATE,
            message: DataTypes.STRING
        },
        {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.Patients, { foreignKey: 'patient_id', as: 'patient' });
      }
}
module.exports = Notes;