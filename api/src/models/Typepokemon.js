const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('type', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })
}