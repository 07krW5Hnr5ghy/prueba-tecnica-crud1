import { DataTypes } from "sequelize";

import postgresInstance from "../configs/postgres.js";

const sequelize = postgresInstance.getSequelize();

const Pet = sequelize.define(
    "Pet",
    {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:DataTypes.STRING,allowNull:false},
        type:{type:DataTypes.STRING,allowNull:false},
    },
    {
        schema:'main',
        tableName:'pets',
        underscored:true,
        timestamps:false
    }
);

export default Pet;