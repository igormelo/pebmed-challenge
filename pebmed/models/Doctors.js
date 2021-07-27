const { Model, DataTypes } = require('sequelize');


class Doctors extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            lastname: DataTypes.STRING,
            login: DataTypes.STRING,
            password: DataTypes.STRING,
        },
            {
                sequelize
            })
    }
    static associate(models) {
        this.hasMany(models.Schedules, { foreignKey: 'doctor_id', as: 'doctor' });
    }

}
module.exports = Doctors;