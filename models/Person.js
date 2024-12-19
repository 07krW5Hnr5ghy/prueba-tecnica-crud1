import { DataTypes } from "sequelize";

import postgresInstance from "../configs/postgres.js";

const sequelize = postgresInstance.getSequelize();

const Person = sequelize.define(
    "Person",
    {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:DataTypes.STRING,allowNull:false},
        age:{type:DataTypes.INTEGER,allowNull:false}
    },
    {
        schema:'main',
        tableName:'persons',
        underscored:true,
        timestamps:false
    }
);

export default Person;