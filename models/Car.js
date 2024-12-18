import { DataTypes } from "sequelize";

import postgresInstance from "../configs/postgres.js";
import Person from "./Person.js";

const sequelize = postgresInstance.getSequelize();

const Car = sequelize.define(
    "car",
    {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        brand:{type:DataTypes.STRING,allowNull:false},
        model:{type:DataTypes.STRING,allowNull:false},
        personId:{
            type:DataTypes.INTEGER,
            references:{model:Person,key:"id"},
            allowNull:false,
        },
    },
    {
        schema:'main',
        underscored:true,
        timestamps:false
    }
);

Car.belongsTo(Person,{foreignKey:"personId"});
Person.hasMany(Car,{foreignKey:"personId"});

export default Car;